import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'lib';

@Component({
  selector: 'app-user-bubble',
  templateUrl: './user-bubble.component.html',
  styleUrls: ['./user-bubble.component.scss']
})
export class UserBubbleComponent implements OnInit {

  @Input() user!: IUser;

  @Input() enableColorPicker: boolean = false;

  public username!: string;

  public color!: string;

  constructor(
    // private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.color = this.user.color;
    this.username = this.user.name.charAt(0);
  }

  public onColorChange(): void {
    if (this.user.color === this.color) return;

    // this.userService.updateUserColor(
    //   this.user.id!,
    //   this.color
    // );
  }
}
