import {Component, Input, OnInit} from '@angular/core';
import {Column} from '../../interfaces/column';
import {ColumnsService} from '../../services/columns.service';
import {ModalColumnComponent} from '../shared-modal/modal-column/modal-column.component';
import {animate, sequence, style, transition, trigger} from '@angular/animations';
import {LayoutService} from '../../services/tools/layout.service';
import {Task} from '../../interfaces/task';
import {TaskService} from '../../services/task.service';
import {LoaderService} from '../../services/tools/loader.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  providers: [ColumnsService],
})
export class ColumnComponent implements OnInit {

  public columnHeight = '580';
  private _column: Column = null;
  public tasks: any[] = [];


  @Input('column') set column(value: Column) {
    if (value !== undefined && value != null && this._column === null) {
      this.loadColumn(value);
    } else if (this._column != null) {
      this._column = value;
    }
  }

  get column() {
    return this._column;
  }


  constructor(
    private columnsService: ColumnsService,
    private dialog: MatDialog,
    private loaderService: LoaderService,
    private layoutService: LayoutService,
    private taskService: TaskService) {
  }


  private loadColumn(value: Column) {
    this.columnsService.getById(value.id).subscribe((res: Column) => {
      this._column = res;
      this.tasks = this._column.tasks;
    });
  }

  public editColumn(item: Column) {
    const dialogRef = this.dialog.open(ModalColumnComponent, {data: {...item}});
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.columnsService.patch(res).subscribe((column: Column) => {
          // Just update name of the colonne
          this._column.name = column.name;
        });
      }
    });
  }

  public updateTaskColumn(task: { value: Task }) {
    task.value.columnId = +this.column.id;
    this.loaderService.addLoader();
    const sub = this.taskService.patch(task.value).subscribe(res => {
      this.loaderService.removeLoader();
      sub.unsubscribe();
    });
  }

  ngOnInit() {
    this.layoutService.reloadTaskEmitter.subscribe(res => {
      this.loadColumn(this.column);
      this.loaderService.removeLoader();
    });
  }

}
