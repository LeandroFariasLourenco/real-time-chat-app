import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UserBubbleComponent } from './components/user-bubble/user-bubble.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { PRIMENG_MODULES } from './primeng-modules';
import { ChatWindowComponent } from './routes/chat-window/chat-window.component';
import { CreateUserComponent } from './routes/create-user/create-user.component';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';
import { UserRestService } from './services/rest/user-rest.service';
import { UserSocketService } from './services/socket/user-socket.service';
import { ChatRestService } from './services/rest/chat-rest.service';
import { ChatSocketService } from './services/socket/chat-socket.service';
import { MessageRestService } from './services/rest/message-rest.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CreateUserComponent,
    ChatWindowComponent,
    ChatComponent,
    SideBarComponent,
    UserBubbleComponent,
    UserFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ...PRIMENG_MODULES,
  ],
  providers: [
    ChatService,
    UserRestService,
    ChatRestService,
    MessageRestService,
    DialogService,
    MessageService,
    AuthenticationGuard,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
