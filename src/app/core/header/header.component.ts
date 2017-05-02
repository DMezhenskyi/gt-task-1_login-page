import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../auth/auth.service.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @HostBinding('class.header') header = true;
  loggedInUser: IUser;

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this._auth.onUserLoggedIn$.subscribe(user => this.loggedInUser = user);
    this._auth.onUserLoggedOut$.subscribe(user => this.loggedInUser = null);
    this.loggedInUser = this._auth.getLoggedInUser();
  }

  ngOnDestroy() {
    this._auth.onUserLoggedIn$.unsubscribe();
    this._auth.onUserLoggedOut$.unsubscribe();
  }

  logoutUser() {
    this._auth.logout();
  }

}
