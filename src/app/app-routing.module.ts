import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoardsComponent} from './components/boards/boards.component';
import {BoardComponent} from './components/board/board.component';
import {ConnectedGuard} from './guards/connected.guard';
import {LoginComponent} from './pages/login/login.component';
import {ApplicationComponent} from './pages/application/application.component';


const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'app', component : ApplicationComponent, canActivate : [ConnectedGuard], children:
      [
        { path: '', component : BoardsComponent, pathMatch : 'full'},
        { path: 'board/:boardId', component : BoardComponent},
      ]
  },
  { path: 'login', component : LoginComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
