import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.loginService.isLoggedIn()) {
      return true; // Permite el acceso si el usuario está autenticado
    } else {
      this.router.navigate(['/']); // Redirige al login si no está autenticado
      return false;
    }
  }
}