import {AfterViewInit, Component} from '@angular/core';
import {LoaderService} from './services/tools/loader.service';

@Component({
  selector: 'app-root',
  template: `
    <perfect-scrollbar id="ScrollBarContent">
      <mat-progress-bar style="position: fixed; top: 0; z-index: 9" color="accent" *ngIf="loader" mode="indeterminate"></mat-progress-bar>
      <router-outlet></router-outlet>
    </perfect-scrollbar>
  `,
})
export class AppComponent implements AfterViewInit {
  title = 'app';
  public loader = 0;
  constructor(public _loaderService: LoaderService) {}

  public ngAfterViewInit() {
    this._loaderService.observer.subscribe(res => {
      window.setTimeout( () => { this.loader = res; }, 0 );
    });
  }
}
