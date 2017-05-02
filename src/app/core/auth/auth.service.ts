import { EventEmitter, Injectable, Output } from '@angular/core';
import { IAuth, IAuthCredentials, IUser } from './auth.service.interface';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { UserNotFoundException } from './user-not-found.exception';
import { AuthException } from './auth.exception';

@Injectable()
export class AuthService implements IAuth {

  @Output() onUserLoggedIn$: EventEmitter<IUser> = new EventEmitter();
  @Output() onUserLoggedOut$: EventEmitter<null> = new EventEmitter();

  /**
   * Set authentication token to browser local storage
   * @param loggedInUser
   */
  static setToken(loggedInUser: IUser): void {
    window.localStorage.setItem('AuthToken', window.btoa(JSON.stringify(loggedInUser)));
  }
  /**
   * Http provider injecting
   * @param _http
   */
  constructor(private _http: Http) { }

  /**
   * Get data from JSON file and compare passwords and login
   * @param credentials
   * @returns {Observable<IUser>}
   */
  logIn(credentials: IAuthCredentials): Observable<IUser> {
    return this._http.get('./src/users.json').map(
      (users: Response) => {
        const foundedUser = this.compareCredentials(credentials, <IUser[]>users.json());
        if (foundedUser) {
          this.onUserLoggedIn$.emit(foundedUser);
          AuthService.setToken(foundedUser);
        }
        return foundedUser;
      }
    );
  }

  /**
   * Checking if user is logged in
   * @returns {boolean}
   */
  isLoggedIn(): boolean {
    return !!window.localStorage.getItem('AuthToken');
  }

  /**
   * Returns user if user logged in
   * @returns {IUser|null}
   */
  getLoggedInUser(): IUser {
    // Let's check before if user is logged in to avoid JSON.parse error
    if (!this.isLoggedIn()) { return null; }
    return JSON.parse(window.atob(window.localStorage.getItem('AuthToken')));
  }

  /**
   * Just remove token from window local storage
   */
  logout(): void {
    window.localStorage.removeItem('AuthToken');
    this.onUserLoggedOut$.emit();
  }

  /**
   * Cheking if user and password wright
   * @param credentials
   * @param users
   * @returns {IUser}
   * @throws UserNotFoundException
   */
  protected compareCredentials(credentials: IAuthCredentials, users: IUser[]): IUser {
    const {login, password} = credentials;
    const currentUser = users.filter((user: IUser) => user.login === login)[0];
    if (typeof currentUser === 'undefined') {
      throw new UserNotFoundException(`No such user in our JSON file.`);
    } else if (currentUser.password === password) {
        return currentUser;
      } else {
        throw new AuthException(`Wrong password was typed..`);
      }
  }

}
