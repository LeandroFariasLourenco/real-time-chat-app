import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'lib';
import randomColor from 'randomcolor';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  private user: IUser | null = this.userService.getCurrentUser();
  private mode: 'edit' | 'create' = this.user ? 'edit' : 'create';
  public userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  constructor(
    private readonly userService: UserService,
  ) { }

  public ngOnInit(): void {
    if (this.mode === 'edit') {
      this.patchUserValues();
    }
  }

  private patchUserValues(): void {
    this.userForm.patchValue({
      name: this.user!.name,
    });
  }

  public handleSubmit(): void {
    const { name } = this.userForm.value;
    if (this.mode === 'create') {
      this.userService.createUser(name)
      return;
    }
    this.userService.updateUser({
      ...this.user!,
      name: name,
    });
  }

}
