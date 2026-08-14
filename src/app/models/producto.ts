
export interface Producto {
  id: number,
  nombreProducto: string,
  descripcionProducto: string
  precioProducto: number,
  is_habilitado: boolean,
  is_stock: boolean
  detalles?: Detalle[];
}


//Para listar las ordenes de compra de un producto
export interface ProductoDetalle {
  nombreProducto: string;
  descripcionProducto: string;
  precioProducto: number;
  detalles: Detalle[];
}

export interface Detalle {
  id: number;
  fechaIngreso: Date;
  fechaVencimiento: Date;
  cantidad: number;
  nombreEmpresa: string;
}