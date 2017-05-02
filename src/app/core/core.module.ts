import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './auth/auth.service';
import { IndexPageModule } from '../pages/index-page/index-page.module';
import { AppErrorHandler } from './app-error-handler';
import { GlobalErrorNotificatorComponent } from './global-error-notificator/global-error-notificator.component';
import { NotificationWindowComponent } from './notification-window/notification-window.component';

@NgModule({
  imports: [
    CommonModule,
    IndexPageModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    GlobalErrorNotificatorComponent,
    NotificationWindowComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    IndexPageModule,
    GlobalErrorNotificatorComponent,
    NotificationWindowComponent
  ],
  providers: [
    AuthService,
    AppErrorHandler,
    { provide: ErrorHandler, useExisting: AppErrorHandler }
  ]
})
export class CoreModule { }
