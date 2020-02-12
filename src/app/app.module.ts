import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {BoardsComponent} from './components/boards/boards.component';
import {BoardComponent} from './components/board/board.component';
import {SearchComponent} from './components/shared/search/search.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {LoaderService} from './services/tools/loader.service';
import {UserService} from './services/user.service';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ApplicationComponent} from './pages/application/application.component';
import {LoginComponent} from './pages/login/login.component';
import {ModalBoardComponent} from './components/shared-modal/modal-board/modal-board.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalConfirmationComponent} from './components/shared-modal/modal-confirmation/modal-confirmation.component';
import {NgxDnDModule} from '@swimlane/ngx-dnd';


import {ColumnComponent} from './components/column/column.component';
import {TaskComponent} from './components/task/task.component';
import {ModalColumnComponent} from './components/shared-modal/modal-column/modal-column.component';
import {LayoutService} from './services/tools/layout.service';
import {TaskSidebarComponent} from './components/task-sidebar/task-sidebar.component';


import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    BoardComponent,
    SearchComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ApplicationComponent,
    ModalBoardComponent,
    ModalConfirmationComponent,
    ColumnComponent,
    TaskComponent,
    ModalColumnComponent,
    TaskSidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PerfectScrollbarModule,
    NgxDnDModule,
    ReactiveFormsModule
  ],
  entryComponents: [ModalBoardComponent, ModalConfirmationComponent, ModalColumnComponent],
  providers: [LoaderService, UserService, LayoutService, {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
