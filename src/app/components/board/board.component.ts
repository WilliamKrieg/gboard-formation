import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BoardsService} from '../../services/boards.service';
import {BoardI} from '../../interfaces/board';
import {ModalColumnComponent} from '../shared-modal/modal-column/modal-column.component';
import {ColumnsService} from '../../services/columns.service';
import {Column} from '../../interfaces/column';
import {ModalBoardComponent} from '../shared-modal/modal-board/modal-board.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {



  public scrollbarConfig = {
    suppressScrollY : true,
    suppressScrollX : false
  };




  private _boardId: number = null;
  public board: BoardI = null;
  set boardId(value: number) {
    this._boardId = value;
    this.boardsService.getById(value).subscribe((res: BoardI) => {
      this.board = res;
    });
  }

  constructor(private activatedRouted: ActivatedRoute, private boardsService: BoardsService, private columnService: ColumnsService, private dialog: MatDialog) { }

  public editBoard() {
    const dialogRef = this.dialog.open(ModalBoardComponent, {data : this.board});
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.columnService.patch(res).subscribe((board: BoardI) => {
          // Pour l'instant on ne met à jour que le nom.
          this.board.name = board.name;
        });
      }
    });
  }
  public addColumn() {
    const dialogRef = this.dialog.open(ModalColumnComponent, {data : {name : '', boardId : this.board.id}});
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.columnService.add(res).subscribe((column: Column) => {
          this.board.columns = [...this.board.columns, column];
        });
      }
    });
  }




  ngOnInit() {
    this.activatedRouted.params.subscribe(params => {
      if (+params['boardId']) { this.boardId = +params['boardId']; }
    });
  }

}
