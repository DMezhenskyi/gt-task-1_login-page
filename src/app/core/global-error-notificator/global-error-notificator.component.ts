import { Component, ErrorHandler, HostBinding, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-global-error-notificator',
  templateUrl: './global-error-notificator.component.html',
  styleUrls: ['./global-error-notificator.component.scss'],
  animations: [
    trigger('notificator', [
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
export class GlobalErrorNotificatorComponent implements OnInit {

  error: Error;
  private _timer: any;
  state = 'hidden';

  @HostBinding('@notificator') get notificator() {
    return this.state;
  }
  @HostBinding('class.global-error-window') globalErrorWindow = 'global-error-window';

  constructor(private _error: ErrorHandler) { }

  ngOnInit() {
    this._error['onError$'].subscribe(error =>  this.onShow(error));
    this._error['onResetError$'].subscribe(() => this.onHide());
  }

  onShow(error: Error): void {
    this.error = error;
    this.state = 'showed';
    clearTimeout(this._timer);
    this._timer = setTimeout(() => { this.state = 'hidden'; }, 5000);
  }

  onHide(): void {
    clearTimeout(this._timer);
    this.state = 'hidden';
  }

}
