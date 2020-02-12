import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isSomethingLoading = 0;
  public observer: EventEmitter<number> = new EventEmitter();

  constructor() { }

  public addLoader() {
    this.isSomethingLoading++;
    this.observer.emit(this.isSomethingLoading);
  }

  public removeLoader() {
    if (this.isSomethingLoading > 0) { this.isSomethingLoading-- ; }
    this.observer.emit(this.isSomethingLoading);
  }
}
