import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {LoaderService} from './tools/loader.service';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Column} from '../interfaces/column';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {

  constructor(private httpClient: HttpClient, private _loaderService: LoaderService) { }

  public add(item: Column) {
    this._loaderService.addLoader();
    return this.httpClient.post(environment.api + 'columns', item).pipe(map((res: Column) => {
      this._loaderService.removeLoader();
      return res;
    }));
  }
  public patch(item: Column) {
    this._loaderService.addLoader();
    return this.httpClient.patch(environment.api + 'columns/' + item.id, item).pipe(map(res => {
      this._loaderService.removeLoader();
      return res;
    }));
  }
  public delete(id: number) {
    this._loaderService.addLoader();
    return this.httpClient.delete(environment.api + 'columns/' + id).pipe(map(res => {
      this._loaderService.removeLoader();
      return res;
    }));
  }

  public getById(id: number, tasks = true){
    let url = environment.api + 'columns/' + id;
    if (tasks) { url = url + '?_embed=tasks'; }
    this._loaderService.addLoader();
    return this.httpClient.get( url ).pipe( map(res => {
      this._loaderService.removeLoader();
      return res;
    }));
  }
}
