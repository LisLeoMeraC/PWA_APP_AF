// models.ts
export interface OrdenVenta {
  id?: number; // Opcional porque se genera en el backend
  fechaVenta: string;
  comprador: string;
  estadoOrden: boolean;
  tipoPago: string; // 'E' (Efectivo), 'T' (Transferencia), 'C' (Cheque)
  nombreBanco?: string; // Opcional, solo para tipo de pago 'Cheque'
  fechaCaducidad?: string; // Opcional, solo para tipo de pago 'Cheque'
  valorTotal?: number; // Opcional, solo para tipo de pago 'Cheque'
}

export interface DetalleVenta {
  id?: number; // Opcional porque se genera en el backend
  ordenVenta: { id: number };
  detalleOrden: { id: number };
  cantidad: number;
  precioUnitario: number;
}

export interface Producto {
  id: number;
  nombreProducto: string;
  precioProducto: number;
  cantidad?: number; // Cantidad seleccionada por el usuario
  total?: number; // Total calculado (cantidad * precioUnitario)
}

export interface DetalleVentasyProducto {
  id: number;
  ordenVenta: {
    id: number;
    fechaVenta: string;
    comprador: string;
    estadoOrden: boolean;
    tipoPago: string;
    nombreBanco?: string;
    fechaCaducidad?: string;
    valorTotal: number;
  };
  detalleOrden: { id: number };
  nombreProducto: string;
  precioProducto: number;
  cantidad: number;
  precioUnitario: number;
  total: number;
}

export interface Pago {
  id?: number; // Opcional porque se genera en el backend
  ordenVenta: { id: number };
  fechaPago: string;
  tipoPago: string; // 'E' (Efectivo), 'T' (Transferencia), 'C' (Cheque)
  nombreBanco?: string; // Opcional, solo para tipo de pago 'Cheque'
  fechaCaducidad?: string; // Opcional, solo para tipo de pago 'Cheque'
  cuota: number;
  saldo?: number;
}