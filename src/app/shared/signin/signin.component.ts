import { Component, OnInit, ErrorHandler, HostBinding } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  @HostBinding('class.container') container = true;

  constructor(private _auth: AuthService,
              private _error: ErrorHandler
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'login': new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_]+$/),
        Validators.minLength(3)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    });
    this._auth.onUserLoggedIn$.subscribe(() => {
      this._error['resetError'].apply(this._error);
    });
  }

  loginAttempt(): void {
    console.log(this.loginForm);
    this._auth.logIn(this.loginForm.value).subscribe(
      () => this.loginForm.reset(), (error: Error) => this._error.handleError(error)
    );
  }

}
