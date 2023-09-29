import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PRIMENG_MODULES } from "../primeng-modules";
import { ChatComponent } from "./chat/chat.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { UserBubbleComponent } from "./user-bubble/user-bubble.component";
import { UserFormComponent } from "./user-form/user-form.component";

const components = [
  ChatComponent,
  SideBarComponent,
  UserBubbleComponent,
  UserFormComponent
];

@NgModule({
  declarations: [...components],
  providers: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ...PRIMENG_MODULES
  ],
  exports: [...components, ...PRIMENG_MODULES]
})
export class ComponentsModule { }