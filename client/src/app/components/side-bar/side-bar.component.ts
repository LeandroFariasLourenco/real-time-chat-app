import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'lib';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/services/auth.service';
import { UserRestService } from 'src/app/services/rest/user-rest.service';
import { UserSocketService } from 'src/app/services/socket/user-socket.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, AfterViewInit {
  @ViewChild('listOfUsers') listOfUsers!: ElementRef<HTMLDivElement>;
  
  @Input('user') public currentUser!: IUser;
  
  @Input() public users: IUser[] = [];
  
  public statusOptions = [
    { label: 'Disponível' },
    { label: 'Offline' },
  ];

  constructor(
    public readonly userRestService: UserRestService,
    public readonly userSocketService: UserSocketService,
    public readonly authService: AuthService,
    private readonly dialogService: DialogService,
    private readonly router: Router,
    private readonly messageService: MessageService,
  ) { }

  public ngOnInit(): void {
  }
  
  public ngAfterViewInit(): void {
    this.listOfUsers.nativeElement.style.height = `${this.listOfUsers.nativeElement.clientHeight}px`
  }

  public openEditNickName(): void {
    this.dialogService.open(UserFormComponent, {
      header: "Alterar apelido",
    });
  }

  public logout(): void {
    this.authService.logout().subscribe(() => {
      this.messageService.add({
        severity: 'success',
        detail: 'Sessão finalizada.',
        summary: 'Sucesso',
        key: 'notification'
      });
      this.router.navigateByUrl('/create-user');
      this.userSocketService.dispatchUserDisconnected(this.currentUser);
    });
  }
}
