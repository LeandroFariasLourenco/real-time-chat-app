import { Injectable } from "@angular/core";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationGuard {

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  public canActivate(): boolean {
    if (this.userService.getCurrentUser()) {
      return true;
    }

    this.router.navigateByUrl('/create-user');
    return false;
  }
}