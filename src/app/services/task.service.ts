import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {BoardI} from '../interfaces/board';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from './tools/loader.service';
import {Observable} from 'rxjs';
import {Task} from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient, private loaderService: LoaderService) {
  }


  public getLists(): Observable<Task[]> {
    this.loaderService.addLoader();
    return this.httpClient.get<Task[]>(environment.api + 'tasks').pipe(map(res => {
      this.loaderService.removeLoader();
      return res;
    }));
  }

  public add(data: Task): Observable<Task> {
    this.loaderService.addLoader();
    return this.httpClient.post<Task>(environment.api + 'tasks', data).pipe(map(res => {
      this.loaderService.removeLoader();
      return res;
    }));
  }

  public patch(data: Task): Observable<Task> {
    this.loaderService.addLoader();
    return this.httpClient.patch<Task>(environment.api + 'tasks/' + data.id, data).pipe(map(res => {
      this.loaderService.removeLoader();
      return res;
    }));
  }

  public delete(id: number): Observable<Task> {
    this.loaderService.addLoader();
    return this.httpClient.delete<Task>(environment.api + 'tasks/' + id).pipe(map(res => {
      this.loaderService.removeLoader();
      return res;
    }));
  }

  public getById(id: number, culumns = true): Observable<Task> {
    let url = environment.api + 'tasks/' + id;
    if (culumns) {
      url = url + '?_embed=column';
    }
    this.loaderService.addLoader();
    return this.httpClient.get<Task>(url).pipe(map(res => {
      this.loaderService.removeLoader();
      return res;
    }));
  }
}
