import { Component, OnInit } from '@angular/core';
import { IUser } from 'lib';
import { DialogService } from 'primeng/dynamicdialog';
import { UserService } from 'src/app/services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  public currentUser: IUser = this.userService.getCurrentUser()!;
  public users: IUser[] = [];
  public statusOptions = [
    { label: 'Disponível' },
    { label: 'Offline' },
  ];

  constructor(
    public readonly userService: UserService,
    private readonly dialogService: DialogService
  ) { }

  public ngOnInit(): void {
    this.listenForNewUsers();
    this.getAllUsers();
  }

  private getAllUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = [...users];
    });
  }

  private listenForNewUsers(): void {
    this.userService.onUserCreated().subscribe((users) => {
      this.users = [...users];
    });
  }

  public openEditNickName(): void {
    this.dialogService.open(UserFormComponent, {
      header: "Alterar apelido",
    });
  }
}
