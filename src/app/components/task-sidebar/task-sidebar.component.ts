import {Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutService} from '../../services/tools/layout.service';
import {Task} from '../../interfaces/task';
import {TaskService} from '../../services/task.service';
import {LoaderService} from '../../services/tools/loader.service';
import {Subscriber, Subscription} from 'rxjs';

@Component({
  selector: 'app-task-sidebar',
  templateUrl: './task-sidebar.component.html',
  styleUrls: ['./task-sidebar.component.scss']
})
export class TaskSidebarComponent implements OnInit, OnDestroy{

  public task: Task = null;

  public subscriptions: Subscription[] = [];

  constructor(private layoutService: LayoutService, private taskService: TaskService, private loaderService: LoaderService) {
  }

  updateTask() {
    this.loaderService.addLoader();
    this.subscriptions.push(
      this.taskService.patch(this.task).subscribe(res => {
        this.loaderService.removeLoader();
        this.layoutService.reloadTaskEmitter.emit(true);
      }, err => {
        this.loaderService.removeLoader();
      })
    );
  }

  ngOnInit() {
    this.subscriptions.push(
      this.layoutService.taskEmitter.subscribe((res: Task) => {
        this.task = res;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe() );
  }

}
