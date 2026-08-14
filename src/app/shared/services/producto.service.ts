import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Detalle, Producto } from '../../models/producto';
import { Observable } from 'rxjs';
import baseUrl from './helper';
import { Page } from '../../models/page';
import { Inventario } from '../../models/orden-compra';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }

  registrarProducto(producto:Producto):Observable<Producto>{
    return this.http.post<Producto>(`${baseUrl}/productos`,producto)
  }

  listarProductos(page:number, size:number=10):Observable<Page<Producto>>{
    const params=new HttpParams()
    .set('page',page.toString())
    .set('size',size.toString());
    return this.http.get<Page<Producto>>(`${baseUrl}/productos/habilitados`,{params});
  }

  listarProductosConStock(page:number, size:number=10):Observable<Page<Producto>>{
    const params=new HttpParams()
    .set('page',page.toString())
    .set('size',size.toString());
    return this.http.get<Page<Producto>>(`${baseUrl}/productos/stock-true`,{params});
  }

  actualizarProducto(id:number, producto:Producto):Observable<Producto>{
    return this.http.put<Producto>(`${baseUrl}/productos/${id}`,producto)
  }

  buscarProductoPorNombre(nombreProducto:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${baseUrl}/productos/buscar?nombre=${nombreProducto}`);
  }

  buscarProductoPorNombresStock(nombreProducto:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${baseUrl}/productos/buscar-stock?nombre=${nombreProducto}`);
  }


  buscarProductoEnInventario(nombreProducto:string):Observable<Inventario[]>{
    return this.http.get<Inventario[]>(`${baseUrl}/productos/inventario-buscar?nombre=${nombreProducto}`);
  }


  obtenerDetallesPorProductoId(productoId: number): Observable<Detalle[]> {
    return this.http.get<Detalle[]>(`${baseUrl}/orden-ingreso/detalles/producto/${productoId}`);
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/productos/${id}`);
  }
}
