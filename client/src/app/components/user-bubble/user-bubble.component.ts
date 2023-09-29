import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'lib';

@Component({
  selector: 'app-user-bubble',
  templateUrl: './user-bubble.component.html',
  styleUrls: ['./user-bubble.component.scss']
})
export class UserBubbleComponent implements OnInit {

  @Input() user!: IUser;

  constructor() { }

  public ngOnInit(): void {
  }

}
