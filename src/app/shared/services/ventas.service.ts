import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleVenta, DetalleVentasyProducto, OrdenVenta, Pago } from '../../models/venntas';
import { Observable } from 'rxjs';
import baseUrl from './helper';
import { Page } from '../../models/page';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) { }

  registrarOrdenVenta(ordenVenta: OrdenVenta): Observable<OrdenVenta> {
    return this.http.post<OrdenVenta>(`${baseUrl}/ventas/encabezado`, ordenVenta);
  }

  registrarDetallesVenta(detallesVenta: DetalleVenta[]): Observable<DetalleVenta[]> {
    return this.http.post<DetalleVenta[]>(`${baseUrl}/ventas/crear-detalle`, detallesVenta);
  }

  registrarPago(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(`${baseUrl}/ventas/registrar-pago`, pago);
  }

  listarOrdenesVentas(page: number, size: number = 10): Observable<Page<OrdenVenta>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<OrdenVenta>>(`${baseUrl}/ventas/ordenes`, { params });
  }

  buscarVentasPorComprador(nombre: string): Observable<OrdenVenta[]> {
    return this.http.get<OrdenVenta[]>(`${baseUrl}/ventas/buscar-por-comprador?comprador=${nombre}`);
  }

  listarPagosPorOrden(ordenId: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${baseUrl}/ventas/pagos/${ordenId}`);
  }

  obtenerDetallesPorOrdenId(ordenId: number):Observable<DetalleVentasyProducto[]> {
    return this.http.get<DetalleVentasyProducto[]>(`${baseUrl}/ventas/detalles/${ordenId}`);
  }

  eliminarOrdenVenta(ordenId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${baseUrl}/ventas/eliminar/${ordenId}`);
  }
}
