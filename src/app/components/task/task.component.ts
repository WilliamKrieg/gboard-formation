import {Component, Input, OnInit} from '@angular/core';
import {LayoutService} from '../../services/tools/layout.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: any = null;
  constructor(private layoutService: LayoutService) { }
  showTask() {
    this.layoutService.taskEmitter.emit({...this.task});
    this.layoutService.sideBar.open();
  }
  ngOnInit() {
  }

}
