import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import baseUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new Subject<boolean>();

  constructor(private http:HttpClient, private router:Router) { }

  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  public getCurrentUser(){
    let token = this.getToken();
    if (token) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${baseUrl}/actual-usuario`, {headers: headers});
  }
    return throwError('No token found');
  }

  //iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token:any){
    localStorage.setItem('token',token);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  //cerramoss sesion y eliminamos el token del localStorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatusSubject.next(false); // Si estás utilizando esto para manejar el estado de la sesión
    this.router.navigate(['']);
    return true;
  }

  //obtenemos el token
  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public isGerente(): boolean {
    return this.getUserRole() === 'Gerente';
  }

  public isSecretario(): boolean {
    return this.getUserRole() === 'Secretario/a';
  }
}

