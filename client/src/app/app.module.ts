import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { AuthenticationGuard } from './guard/authentication.guard';
import { CreateUserComponent } from './routes/create-user/create-user.component';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { ChatService } from './services/chat.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CreateUserComponent,
  ],
  imports: [
    AppRoutingModule,
    ComponentsModule,
  ],
  providers: [
    ChatService,
    UserService,
    DialogService,
    MessageService,
    AuthenticationGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
