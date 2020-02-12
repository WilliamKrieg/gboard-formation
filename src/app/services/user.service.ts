import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../interfaces/user';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class UserService {


  private _userConnected = false;

  set userConnected(value: boolean) {
    this._userConnected = value;
    window.localStorage.setItem('userConnected', JSON.stringify(this._userConnected));
  }

  get userConnected(): boolean {
    return this._userConnected;
  }

  private _user: User = null;

  set user(value: User) {
    if (value === null) {
      this._user = null;
      this.userConnected = false;
      window.localStorage.removeItem('user');
    } else {
      this._user = value;
      this.userConnected = true;
      window.localStorage.setItem('user', JSON.stringify(value));
    }
  }


  get user(): User {
    return this._user;
  }


  constructor(private httpClient: HttpClient, private router: Router) {
    const userConnected = window.localStorage.getItem('userConnected');
    if (userConnected) {
      this._userConnected = JSON.parse(userConnected);
    }
    const userTemp = window.localStorage.getItem('user');
    if (userTemp) {
      this._user = JSON.parse(userTemp);
    }

    console.log('user', this._user);
    console.log('connected', this._userConnected);
  }

  public login(): Observable<any> {
    return this.httpClient.get(environment.api + 'users/1').pipe(map(
      (res: User) => {
        this.user = res;
        return res;
      }
    ));
  }

  public logout(): void {
    this.user = null;
    this.router.navigate(['/login']);
  }
}
