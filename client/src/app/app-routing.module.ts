import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';
import { CreateUserComponent } from './routes/create-user/create-user.component';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { ChatWindowComponent } from './routes/chat-window/chat-window.component';
import { WelcomeComponent } from './routes/welcome/welcome.component';

const routes: Routes = [
  {
    path: 'home-page',
    canActivate: [AuthenticationGuard],
    component: HomePageComponent,
    children: [
      { component: WelcomeComponent, path: '' },
      { component: ChatWindowComponent, path: 'chat' },
      { path: '**', redirectTo: 'home-page' }
    ],
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
