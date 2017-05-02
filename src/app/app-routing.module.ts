import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexPageComponent } from './pages/index-page/index-page.component';

export const routes: Routes = [
  { path: '', component: IndexPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
