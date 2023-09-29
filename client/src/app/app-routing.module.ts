import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';
import { CreateUserComponent } from './routes/create-user/create-user.component';
import { HomePageComponent } from './routes/home-page/home-page.component';

const routes: Routes = [
  {
    path: 'home-page',
    component: HomePageComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
  },
  {
    path: '**',
    redirectTo: 'home-page'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
