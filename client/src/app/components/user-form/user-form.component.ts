import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'lib';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserRestService } from 'src/app/services/rest/user-rest.service';
import { UserSocketService } from 'src/app/services/socket/user-socket.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  private user: IUser | null = null;

  public mode: 'edit' | 'create' | 'login' = 'create';

  public isLoading: boolean = false;

  public errorMessage!: string;

  public userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  constructor(
    private readonly userRestService: UserRestService,
    private readonly userSocketService: UserSocketService,
    private readonly messageService: MessageService,
    private readonly dialogService: DialogService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  public ngOnInit(): void {
    if (this.mode === 'edit') {
      this.patchUserValues();
    } else {
      this.userForm.addControl('room', new FormControl(''));
    }
  }

  private patchUserValues(): void {
    this.userForm.patchValue({
      name: this.user!.name,
    });
  }

  private createAuthSession(): void {
    this.authService.login(this.userForm.getRawValue().name)
      .pipe(finalize(() => {
        this.setLoadingState(false);
      }))
      .subscribe(({ user }) => {
        this.router.navigateByUrl("/home-page");
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
          dialog.destroy();
        });
        this.userSocketService.dispatchNewUserCreated(user);
      });
  }

  private setLoadingState(state: boolean) {
    this.isLoading = state;
    if (this.isLoading) {
      this.errorMessage = '';
      this.userForm.disable();
      return;
    }
    this.userForm.enable();
  }

  public changeFormMode(mode: 'edit' | 'create' | 'login'): void {
    this.errorMessage = '';
    this.mode = mode;
  }

  public handleSubmit(): void {
    this.setLoadingState(true);
    const { name } = this.userForm.getRawValue();
    switch (this.mode) {
      case 'create':
        this.userRestService.createUser(name)
          .subscribe({
            complete: () => {
              this.messageService.add({
                severity: 'success',
                detail: `Usuário ${name} criado com sucesso.`,
                summary: 'Bem vindo!',
                key: 'notification'
              });
              this.createAuthSession();
            },
            error: () => {
              this.errorMessage = "Usuário já existente.";
              this.setLoadingState(false);
            }
          });
        break;

      case 'login':
        this.authService.login(name)
          .subscribe({
            complete: () => {
              this.createAuthSession();
            },
            error: () => {
              this.errorMessage = "Usuário não encontrado";
              this.setLoadingState(false);
            }
          });
        break;
    }
  }

}
