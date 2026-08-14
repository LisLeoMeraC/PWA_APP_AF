import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../../models/proveedor';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http:HttpClient) { }

  listarProveedores():Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(`${baseUrl}/proveedores`);
  }

  registrarProveedor(proveedor:Proveedor):Observable<Proveedor>{
    return this.http.post<Proveedor>(`${baseUrl}/proveedores`,proveedor)
  }

  actualizarProveedpr(id:number, proveedor:Proveedor):Observable<Proveedor>{
    return this.http.put<Proveedor>(`${baseUrl}/proveedores/${id}`,proveedor)
  }

  buscarProveedorPorNombre(nombreEmpresa:string):Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(`${baseUrl}/proveedores/buscar?nombreEmpresa=${nombreEmpresa}`);
  }

  eliminarProveedor(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/proveedores/${id}`);
  }
}

