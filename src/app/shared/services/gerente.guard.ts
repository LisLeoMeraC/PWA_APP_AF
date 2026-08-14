import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';

export const gerenteGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isLoggedIn() && loginService.isGerente()) {
    return true;
  }

  Swal.fire({
    icon: 'error',
    title: 'Acceso Denegado',
    text: 'No posee permisos para utilizar esta aplicación.',
    confirmButtonColor: '#2E7D32'
  });

  loginService.logout();
  router.navigate(['/']);
  return false;
};
