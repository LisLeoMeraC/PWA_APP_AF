import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData = {
    username: '',
    password: ''
  };

  isPasswordVisible = false;

  private router = inject(Router);
  private loginService = inject(LoginService);

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  login() {
    if (this.loginData.username.trim() === '') {
      Swal.fire({
        icon: 'info',
        title: 'Información',
        text: 'El nombre de usuario es requerido',
        confirmButtonColor: '#2E7D32'
      });
      return;
    }
  
    if (this.loginData.password.trim() === '') {
      Swal.fire({
        icon: 'info',
        title: 'Información',
        text: 'La contraseña es requerida',
        confirmButtonColor: '#2E7D32'
      });
      return;
    }
  
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            this.loginService.setUser(user);
            
            // Validar si es gerente
            if (this.loginService.isGerente()) {
               this.router.navigate(['/dashboard']);
            } else {
               Swal.fire({
                 icon: 'error',
                 title: 'Acceso Denegado',
                 text: 'No posee permisos para utilizar esta aplicación.',
                 confirmButtonColor: '#2E7D32'
               });
               this.loginService.logout();
            }
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ha ocurrido un error inesperado',
              confirmButtonColor: '#2E7D32'
            });
          }
        );
      },
      (error) => {
        if (error.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Autenticación',
            text: 'Usuario o contraseña inválidos',
            confirmButtonColor: '#2E7D32'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al conectar con el servidor',
            confirmButtonColor: '#2E7D32'
          });
        }
      }
    );
  }
}
