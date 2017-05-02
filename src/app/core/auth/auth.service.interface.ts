import { Observable } from 'rxjs/Observable';

export interface IAuthCredentials {
  login: string;
  password: string;
}

export interface IUser {
  login: string;
  password: string;
  email: string;
  name: string;
}

export interface IAuth {
  logIn(credentials: IAuthCredentials): Observable<IUser>;
  isLoggedIn(): boolean;
  getLoggedInUser(): IUser;
  logout(): void;
}
