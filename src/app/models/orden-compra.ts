export interface OrdenIngreso {
   id?: number;
   fechaIngreso: string;
   proveedor: { id: number, nombreEmpresa: string };
   detalles?: DetalleOrden[];
 }
 
 export interface DetalleOrden {
   id?: number;
   ordenIngreso: { id: number };
   producto: { id: number, nombreProducto: string, precioProducto: number };
   fechaVencimiento: string;
   cantidad: number;
   precioVentaUnitario: number;
   editable?:boolean;
 }


 export interface DetallesOrdenResponse {
  fechaIngreso: string;
  proveedor: { nombreEmpresa: string, id: number };
  detalles: DetalleOrden[];
  id: number;
}

export interface Inventario{
  codigoProducto:number;
  nombreProducto:string;
  descripcionProducto:string;
  cantidadTotal:number;
  stockStatus:string;
}