import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { firstValueFrom } from "rxjs";
import { MessageService } from "primeng/api";

@Injectable()
export class AuthenticationGuard {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService,
  ) { }

  public async canActivate(): Promise<boolean> {
    try {
      const session = await firstValueFrom(this.authService.getCurrentSession());

      if (session.id) {
        return true;
      }

      this.router.navigateByUrl('/create-user');
      this.messageService.add({
        key: 'notification',
        severity: 'error',
        summary: 'Não permitido',
        detail: 'Usuário não encontrado.'
      });
      return false;
    } catch (e) {

      this.messageService.add({
        key: 'notification',
        severity: 'error',
        summary: 'Não permitido',
        detail: 'Usuário não autenticado.'
      });
      this.router.navigateByUrl('/create-user');
      return false;
    }
  }
}