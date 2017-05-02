import { ErrorHandler, EventEmitter, Injectable, Output } from '@angular/core';

export interface AppErrorHandler extends ErrorHandler {
  onError$: EventEmitter<Error>;
  onResetError$: EventEmitter<null>;
}

@Injectable()
export class AppErrorHandler implements AppErrorHandler {

  @Output() onError$: EventEmitter<Error> = new EventEmitter();
  @Output() onResetError$: EventEmitter<null> = new EventEmitter();

  constructor() { }

  /**
   * Hide error notification
   */
  resetError() {
    this.onResetError$.emit();
  }

  /**
   * Custom error handler to intercept Angular's own ErrorHandler
   * @param error
   */
  handleError(error: Error): void {
    this.onError$.emit(error);
  }

}
