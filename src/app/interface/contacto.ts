export interface Contacto {
  idContacto: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: number;
  foto: string;
  correo: string;
  etapaAnterior: number;
  etapaActual: number;
  etapaSiguiente: number;
  isInactivo: boolean;
  fecha: Date;
}
