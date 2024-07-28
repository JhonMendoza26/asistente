import { Injectable } from '@angular/core';
import { AsistenteVirtualConstants } from '@app/constants/asistente-virtual';
import { EtapasSeguimiento } from '@app/interface/etapas-seguimiento';
import { Contacto } from '@app/interface/contacto';
import { EtapasResponse } from '@app/interface/etapas-response';
import { ContactoResponse } from '@app/interface/contacto-response';
import { EtapaContacto } from '@app/interface/etapa-contacto';
import { EtapasDescripcionResponse } from '@app/interface/etapas-descripcion-response';
import { Contact } from '@app/interface/contact';

@Injectable({
  providedIn: 'root'
})
export class AsistenteVirtualService {

  constructor() { }

  /**
   * TODO Metodo para obtener las etapas registradas
   * @return EtapasResponse
   * */
  public getEtapas(): EtapasResponse {
    let etapasResponse: EtapasSeguimiento[] = [];
    let msj: string = "";
    try {
      etapasResponse = JSON.parse(localStorage.getItem('tasks') || '[]');
      msj = (etapasResponse.length === 0) ?
        AsistenteVirtualConstants.MSJ_SIN_ETAPAS : AsistenteVirtualConstants.MSJ_SUCCESS;
    } catch (error){
      msj = AsistenteVirtualConstants.MSJ_ERROR + error;
    }

    return {
      code: this.getCodigoPeticion(etapasResponse),
      message: msj,
      etapas: etapasResponse
    }
  }

  /**
   * TODO Metodo para obtener información del contacto
   * @param idContacto - ID del contacto
   * @return contacto
   * */
  public getInfoUsuarioByID(idContacto: number): ContactoResponse {
    let contacts: Contacto[] = [];
    let contact: Contacto | undefined = undefined;
    let msj: string = "";
    let code: number = AsistenteVirtualConstants.CODE_500;
    try {
      if (idContacto > 0) {
        contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        if ( contacts.length > 0 ) {
          contact = <Contacto>contacts.find(contact => contact.idContacto === idContacto);
          code = this.getCodigoPeticion(contact);
        }
      }
      msj = ( this.validarTipoDato(contact) ) ? AsistenteVirtualConstants.MSJ_SUCCESS : AsistenteVirtualConstants.MSJ_SIN_INFO_CONTACTO;
    }catch (error){
      msj = AsistenteVirtualConstants.MSJ_ERROR + error;
    }
    return {
      code: code,
      message: msj,
      contacto: contact
    }
  }

  /**
   * TODO Metodo para obtener etapa de seguimiento
   * @param idEtapaAnterior
   * @param idEtapaActual
   * @param idEtapaSiguiente
   * @return EtapasSeguimiento
   * */
  public getEtapasByIDs(idEtapaAnterior:number, idEtapaActual:number, idEtapaSiguiente:number): EtapasResponse {
    let msj: string = AsistenteVirtualConstants.MSJ_ERROR;
    let code: number = AsistenteVirtualConstants.CODE_404;
    let etapas: EtapasSeguimiento[] = [];
    try {
      if ( idEtapaSiguiente !== 0 ) {
        let idEtapas: number[] = [idEtapaAnterior,idEtapaActual,idEtapaSiguiente];
        const etapasResponse: EtapasResponse = this.getEtapas();
        console.log("getEtapasByIDs: ", etapasResponse);
        if ( etapasResponse.code === AsistenteVirtualConstants.CODE_200 ) {
          etapas = etapasResponse.etapas.filter(task => idEtapas.includes(task.idEtapa)) || [];
          code = this.getCodigoPeticion(etapas);
        }
        msj = ( this.validarTipoDato(etapas) ) ? AsistenteVirtualConstants.MSJ_SUCCESS : AsistenteVirtualConstants.MSJ_SIN_ETAPAS;
      }
    }catch (error){
      code = AsistenteVirtualConstants.CODE_500;
      msj = AsistenteVirtualConstants.MSJ_ERROR + error;
    }

    return {
      code: code,
      message: msj,
      etapas: etapas
    }
  }

  /**
   * TODO: Metodo para obtener codigo de peticion
   * @param tipoDato - Tipo de dato (null, undefined, [])
   * @return codigo
   * */
  private getCodigoPeticion(tipoDato: any): number {
    if ( tipoDato === undefined || tipoDato === null || tipoDato.length === 0 ) {
      return AsistenteVirtualConstants.CODE_404;
    } else {
      return AsistenteVirtualConstants.CODE_200;
    }
  }

  /**
   * TODO: Metodo para validar tipo de dato
   * @param tipoDato - Dato a validar
   * @return boolean - True (Dato valido) False (Dato no valido)
   * */
  public validarTipoDato(tipoDato: any): boolean {
    return (!(tipoDato === undefined || tipoDato === null || tipoDato.length === 0));
  }

  /**
   * TODO: Metodo para obtener la descripcion de las etapas del Contacto para mostrar en el Dashboard
   * @param etapaAnterior - ID de la etapa anterior
   * @param etapaActual - ID de la etapa actual
   * @param etapaSiguiente - ID de la etapa siguiente
   * @return EtapaContacto
   * */
  public obtenerDescripcionEtapaByIDs(etapaAnterior:number,etapaActual:number,etapaSiguiente:number): EtapasDescripcionResponse {
    console.log("obtenerDescripcionEtapaByIDs Paso 1: " + etapaAnterior + " - " + etapaActual + " - " + etapaSiguiente);
    let code: number = 0;
    let msj: string = "";
    let etapasContacto: EtapasResponse = {
      code: 0,
      message: '',
      etapas: []
    }
    let etapasDescripcion: EtapaContacto = {
      idEtapaActual: 0,
      idEtapaAnterior: 0,
      idEtapaSiguiente: 0,
      nombreEtapaActual: '',
      nombreEtapaAnterior: '',
      nombreEtapaSiguiente: '',
      porcentajeEtapaActual: 0,
      valorBarEtapaActual: 0
    };
    try {
      etapasContacto = this.getEtapasByIDs(etapaAnterior,etapaActual,etapaSiguiente);
      console.log("obtenerDescripcionEtapaByIDs: ",etapasContacto);
      if ( etapasContacto.code === AsistenteVirtualConstants.CODE_200 ) {
        const etapaAnteriorResp:EtapasSeguimiento | undefined = etapasContacto.etapas.find(item => item.idEtapa === etapaAnterior);
        const etapaActualResp:EtapasSeguimiento | undefined = etapasContacto.etapas.find(item => item.idEtapa === etapaActual);
        const etapaSiguienteResp:EtapasSeguimiento | undefined = etapasContacto.etapas.find(item => item.idEtapa === etapaSiguiente);
        if ( this.validarTipoDato(etapaAnteriorResp) && this.validarTipoDato(etapaActualResp) && this.validarTipoDato(etapaSiguienteResp) ) {
          etapasDescripcion.idEtapaAnterior = etapaAnteriorResp?.idEtapa || 0;
          etapasDescripcion.nombreEtapaAnterior = etapaAnteriorResp?.nombre || '';
          etapasDescripcion.idEtapaActual = etapaActualResp?.idEtapa || 0;
          etapasDescripcion.nombreEtapaActual = etapaActualResp?.nombre || '';
          etapasDescripcion.valorBarEtapaActual = etapaActualResp?.valor || 0;
          etapasDescripcion.porcentajeEtapaActual = etapaActualResp?.porcentaje || 0;
          etapasDescripcion.idEtapaSiguiente = etapaSiguienteResp?.idEtapa || 0;
          etapasDescripcion.nombreEtapaSiguiente = etapaSiguienteResp?.nombre || '';
          code = AsistenteVirtualConstants.CODE_200;
          msj = AsistenteVirtualConstants.MSJ_SUCCESS;
        } else {
          code = AsistenteVirtualConstants.CODE_404;
          msj = AsistenteVirtualConstants.MSJ_SIN_DESCRIPCION_ETAPAS;
        }
      }
    }catch (error){
      code = AsistenteVirtualConstants.CODE_500;
      msj = AsistenteVirtualConstants.MSJ_ERROR + error;
    }

    return {
      code: code,
      message: msj,
      descripcionEtapa: etapasDescripcion
    }
  }

  /**
   * TODO: Metodo para AVANZAR a la siguiente etapa (Suma 1 a los ID)
   * @param etapaAnterior - ID de la etapa anterior
   * @param etapaActual - ID de la etapa actual
   * @param etapaSiguiente - ID de la etapa siguiente
   * */
  public obtenerEtapaSiguiente(etapaAnterior:number, etapaActual:number, etapaSiguiente:number): EtapasDescripcionResponse {
    console.log("obtenerEtapaSiguiente: " + etapaAnterior + " - " + etapaActual + " - " + etapaSiguiente);
    const newEtapaAnterior: number = etapaAnterior + 1;
    const newEtapaActual: number = etapaActual + 1;
    const newEtapaSiguiente: number = etapaSiguiente + 1;
    return this.obtenerDescripcionEtapaByIDs(newEtapaAnterior,newEtapaActual,newEtapaSiguiente);
  }

  /**
   * TODO: Metodo para RETROCEDE a la etapa anterior (Resta 1 a los ID)
   * @param etapaAnterior - ID de la etapa anterior
   * @param etapaActual - ID de la etapa actual
   * @param etapaSiguiente - ID de la etapa siguiente
   * */
  public obtenerEtapaAnterior(etapaAnterior:number, etapaActual:number, etapaSiguiente:number): EtapasDescripcionResponse {
    console.log("obtenerEtapaAnterior: " + etapaAnterior + " - " + etapaActual + " - " + etapaSiguiente);
    let newEtapaAnterior: number = etapaAnterior - 1;
    let newEtapaActual: number = etapaActual - 1;
    let newEtapaSiguiente: number = etapaSiguiente - 1;
    return this.obtenerDescripcionEtapaByIDs(newEtapaAnterior,newEtapaActual,newEtapaSiguiente);
  }

  /**
   * TODO: Metodo para actualizar datos del Contacto
   * @param idContacto - ID del contacto a editar
   * @param
   * @return void
   * */
  public updateContacto(idContacto:number,contacto: Partial<Contacto>): void {
    let contacts: Contacto[] = [];
    try {
      if ( idContacto > 0 ) {
        contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        let index: number = contacts.findIndex(contact => contact.idContacto === idContacto);
        if ( index !== -1 ) {
          contacts[index] = {
            ...contacts[index],
            ...contacto
          };
          localStorage.setItem('contacts', JSON.stringify(contacts));
          console.log("Se han actualizado los datos del contacto correctamente");
        }
      } else {
        console.log(AsistenteVirtualConstants.MSJ_ERROR_ACTUALIZAR_CONTACTO + "Intentalo de nuevo");
      }

    }catch(error){
      console.log(AsistenteVirtualConstants.MSJ_ERROR_ACTUALIZAR_CONTACTO + error);
    }
  }

}
