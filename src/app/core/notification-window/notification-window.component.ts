import { Component, HostBinding, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-notification-window',
  templateUrl: './notification-window.component.html',
  styleUrls: ['./notification-window.component.scss'],
  animations: [
    trigger('notificationWindow', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(10px)',
        visibility: 'hidden'
      })),
      state('showed', style({
        opacity: 1,
        transform: 'translateY(0)',
        visibility: 'visible'
      })),
      transition('hidden <=> showed', animate(200))
    ])
  ]
})
export class NotificationWindowComponent implements OnInit {

  state = 'hidden';
  message: string;
  private _timer: any;

  @HostBinding('@notificationWindow') get notificationWindow() {
    return this.state;
  }

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this._auth.onUserLoggedIn$.subscribe(() => this.onShow('Great! You have just logged in!'));
  }

  onShow(displayMessage: string) {
    clearTimeout(this._timer);
    this.state = 'showed';
    this._timer = setTimeout(() => { this.state = 'hidden'; }, 3000);
    this.message = displayMessage;
  }

}
