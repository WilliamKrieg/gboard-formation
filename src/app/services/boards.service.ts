import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LoaderService} from './tools/loader.service';
import {map} from 'rxjs/operators';
import {BoardI} from '../interfaces/board';


@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(private httpClient: HttpClient, private _loaderService: LoaderService) { }

  public getLists() {
    this._loaderService.addLoader();
    return this.httpClient.get(environment.api + 'boards').pipe(map(res => {
      this._loaderService.removeLoader();
      return res;
    }));
  }

  public add(board: BoardI) {
    this._loaderService.addLoader();
    return this.httpClient.post(environment.api + 'boards', board).pipe(map(res => {
      this._loaderService.removeLoader();
      return res;
    }));
  }
  public patch(board: BoardI) {
    this._loaderService.addLoader();
    return this.httpClient.patch(environment.api + 'boards/' + board.id, board).pipe(map(res => {
      this._loaderService.removeLoader();
      return res;
    }));
  }
  public delete(boardId: number) {
    this._loaderService.addLoader();
    return this.httpClient.delete(environment.api + 'boards/' + boardId).pipe(map(res => {
      this._loaderService.removeLoader();
      return res;
    }));
  }

  public getById(id: number, culumns = true) {
    let url = environment.api + 'boards/' + id;
    if (culumns) { url = url + '?_embed=columns'; }
    this._loaderService.addLoader();
    return this.httpClient.get( url ).pipe( map(res => {
      this._loaderService.removeLoader();
      return res;
    }));
  }

}
