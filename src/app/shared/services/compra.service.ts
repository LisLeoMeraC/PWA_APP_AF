import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleOrden, DetallesOrdenResponse, Inventario, OrdenIngreso } from '../../models/orden-compra';
import { Observable } from 'rxjs';
import baseUrl from './helper';
import { Page } from '../../models/page';
import { ProductoDetalle } from '../../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) { }

  registrarOrdenIngreso(ordenIngreso: OrdenIngreso): Observable<OrdenIngreso> {
    return this.http.post<OrdenIngreso>(`${baseUrl}/orden-ingreso`, ordenIngreso);
  }

  registrarDetalleOrden(detalles: DetalleOrden[]): Observable<DetalleOrden[]> {
    return this.http.post<DetalleOrden[]>(`${baseUrl}/orden-ingreso/detalle`, detalles);
  }

  listarOrdenesIngreso(page: number, size: number = 10): Observable<Page<OrdenIngreso>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<OrdenIngreso>>(`${baseUrl}/orden-ingreso`, { params });
  }

  listarOrdenesPorFecha(fecha: string): Observable<OrdenIngreso[]> {
    return this.http.get<OrdenIngreso[]>(`${baseUrl}/orden-ingreso/por-fecha?fecha=${fecha}`);
  }

  obtenerDetallesOrden(ordenId: number): Observable<DetallesOrdenResponse> {
    return this.http.get<DetallesOrdenResponse>(`${baseUrl}/orden-ingreso/detalles/${ordenId}`);
  }

  obbtenerInventario(page:number,size:number=10):Observable<Page<Inventario>>{
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Inventario>>(`${baseUrl}/productos/stock`, { params });
  }

  actualizarDetalleOrden(id:number, detalle:DetalleOrden):Observable<DetalleOrden>{
    return this.http.put<DetalleOrden>(`${baseUrl}/orden-ingreso/${id}`,detalle)
  }

  obtenerDetalleProducto(codigoProducto: number): Observable<ProductoDetalle> {
    return this.http.get<ProductoDetalle>(`${baseUrl}/productos/detalle/${codigoProducto}`);
  }

  eliminarOrdenIngreso(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${baseUrl}/orden-ingreso/${id}`);
  }

  /*eliminarDetalleOrden(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/orden-ingreso/detalles/${id}`);
  }*/

  
}
