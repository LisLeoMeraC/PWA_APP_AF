import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { LoginService } from "./login.service";
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import baseUrl from "./helper";



export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const loginService = inject(LoginService); // Usa inject para obtener el servicio
  const router = inject(Router); // Usa inject para obtener el Router

  console.log('Intercepting request:', req.url); // Verifica la URL de la solicitud

  // Agrega el token solo si la solicitud es hacia tu backend
  if (req.url.includes(baseUrl)) {
    const token = loginService.getToken();
    console.log('Token:', token); // Verifica que el token se esté obteniendo correctamente

    if (token != null) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }, // Asegúrate de que el token tenga el prefijo "Bearer"
      });
      console.log('Request headers:', req.headers); // Verifica los encabezados de la solicitud
    }
  }

  return next(req).pipe(
    catchError((error) => {
      console.error('Error in interceptor:', error); // Verifica los errores
      if (error.status === 401) {
        loginService.logout();
        router.navigate(['/']);
      }
      return throwError(() => error);
    })
  );
};