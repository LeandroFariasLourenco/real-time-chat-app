import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IUser } from 'lib';
import { DialogService } from 'primeng/dynamicdialog';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, AfterViewInit {
  @ViewChild('listOfUsers') listOfUsers!: ElementRef<HTMLDivElement>;
  public currentUser: IUser = this.userService.getCurrentUser()!;
  public users: IUser[] = [];
  public statusOptions = [
    { label: 'Disponível' },
    { label: 'Offline' },
  ];

  constructor(
    public readonly userService: UserService,
    private readonly dialogService: DialogService,
    private readonly chatService: ChatService,
  ) { }

  public ngOnInit(): void {
    this.listenForNewUsers();
    this.getAllUsers();
  }
  
  public ngAfterViewInit(): void {
    this.listOfUsers.nativeElement.style.height = `${this.listOfUsers.nativeElement.clientHeight}px`
  }

  private getAllUsers(): void {
    this.userService.getUsers().subscribe(({ users }) => {
      this.users = [...users];
      this.users.reverse();
    });
  }

  private listenForNewUsers(): void {
    this.chatService.onUserConnected().subscribe((users) => {
      this.users = [...users];
      this.users.reverse();
    });
  }

  public openEditNickName(): void {
    this.dialogService.open(UserFormComponent, {
      header: "Alterar apelido",
    });
  }
}
