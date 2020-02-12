import {EventEmitter, Injectable} from '@angular/core';
import {Task} from '../../interfaces/task';
import {MatSidenav} from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public  sideBar: MatSidenav = null;
  public taskEmitter: EventEmitter<Task> = new EventEmitter();
  public reloadTaskEmitter: EventEmitter<boolean> = new EventEmitter();
  constructor() { }


}
