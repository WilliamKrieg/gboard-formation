import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {LoaderService} from '../../services/tools/loader.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup = null;

  constructor(private userService: UserService, private router: Router, private loaderService: LoaderService) {
    this.formGroup = new FormGroup(
      {
        mail : new FormControl('', [Validators.required, Validators.email]),
        password : new FormControl('', [Validators.required, Validators.minLength(5)])
      }
    );
  }

  public login() {
    this.loaderService.addLoader();
    this.userService.login().subscribe(res => {
      window.setTimeout(() => {
        this.loaderService.removeLoader();
        this.router.navigate(['/app']);
      }, 1000);

    });
  }

  ngOnInit() {
  }

}
