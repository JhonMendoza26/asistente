export class AsistenteVirtualConstants {
  //TODO Mensajes Procesos
  static readonly MSJ_SIN_ETAPAS: string = 'No existen etapas registradas';
  static readonly MSJ_SIN_INFO_CONTACTO: string = 'Error al consultar información del contacto';
  static readonly MSJ_SIN_DESCRIPCION_ETAPAS: string = 'No se pudo obtener la descripcion de las etapas del Contacto';
  static readonly MSJ_ERROR_ACTUALIZAR_CONTACTO: string = 'No se pudo actualizar la informacion del contacto: ';

  // TODO Etapas
  static readonly MSJ_FINALIZAR_ETAPA: string = 'Completado ';
  static readonly MSJ_ETAPA_FIRMA_NOTARIO: string = 'Firma ante notario (Venta)';
  static readonly MSJ_ETAPA_ENTRTEGA_LLAVES: string = 'Entrega de llaves (Renta)';
  static readonly CODE_ETAPA_ANTERIOR: number = -1;
  static readonly CODE_ETAPA_ACTUAL: number = 0;
  static readonly CODE_ETAPA_SIGUIENTE: number = 1;
  static readonly ETAPA_NO_DISPONIBLE: number = -1;
  static readonly ETAPA_NO_INICIADOR: number = 0;
  static readonly ETAPA_RECORRIDO_INICIAL: number = 1;
  static readonly ETAPA_SEGUIMIENTO: number = 2;
  static readonly ETAPA_OFERTA: number = 3;
  static readonly ETAPA_FIRMA_CONTRATOR: number = 4;
  static readonly ETAPA_ANTICIPO: number = 5;
  static readonly ETAPA_FIRMA_NOTARIO: number = 6;
  static readonly ETAPA_ENTREGA_LLAVES: number = 7;
  static readonly ETAPA_FINALIZAR_SEGUIMIENTO: number = 8;
  static readonly ETAPA_COMPLETADOR: number = 9;

  // TODO Acciones
  static readonly MSJ_ERROR: string = 'Error al ejecutar proceso: ';
  static readonly MSJ_SUCCESS: string = 'Proceso ejecutado correctamente';

  // TODO Codigo Peticiones
  static readonly CODE_200: number = 200;
  static readonly CODE_404: number = 404;
  static readonly CODE_500: number = 500;

  static readonly MSJ_ELIMINAR_CONTACTO: string = '';
  static readonly MSJ_EDITAR_CONTACTO: string = '';
  static readonly MSJ_GUARDAR_CONTACTO: string = '';
  static readonly MSJ_AVANZAR_ETAPA: string = '¿Estás seguro de avanzar al siguiente estatus?';
  static readonly MSJ_REGRESAR_ETAPA: string = '¿Estás seguro de regresar al siguiente estatus?';
  static readonly CODE_ELIMINAR_CONTACTO: number = 1;
  static readonly CODE_EDITAR_CONTACTO: number = 2;
  static readonly CODE_GUARDAR_CONTACTO: number = 3;
}
