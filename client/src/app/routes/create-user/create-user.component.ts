import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(
    private readonly dialogService: DialogService,
  ) { }

  public ngOnInit(): void {
    this.openCreateUserForm();
  }

  public openCreateUserForm(): void {
    this.dialogService.open(UserFormComponent, {
      header: "Novo usuário",
      dismissableMask: false,
      closable: false,
      closeOnEscape: false,
      draggable: false,
      width: "375px",
    });
  }

}
