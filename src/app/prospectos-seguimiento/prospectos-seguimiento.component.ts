import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '@app/interface/task';
import { AlertController } from '@ionic/angular';
import { Contacto } from '@app/interface/contacto';
import { EtapaContacto } from '@app/interface/etapa-contacto';
import { AsistenteVirtualService } from '@app/services/asistente-virtual.service';
import { EtapasResponse } from '@app/interface/etapas-response';
import { AsistenteVirtualConstants } from '@app/constants/asistente-virtual';
import { ContactoResponse } from '@app/interface/contacto-response';
import { EtapasDescripcionResponse } from '@app/interface/etapas-descripcion-response';

@Component({
  selector: 'app-prospectos-seguimiento',
  templateUrl: './prospectos-seguimiento.component.html',
  styleUrls: ['./prospectos-seguimiento.component.scss']
})
export class ProspectosSeguimientoComponent implements OnInit {

  etapasSeguimiento: EtapasResponse = {
    code: 0,
    etapas: [],
    message: ''
  };

  infoContacto: ContactoResponse = {
    code: 0,
    message: ''
  };

  descripcionEtapas?: EtapasDescripcionResponse;

  isBtnDisabledBack: boolean = true;
  isBtnDisabledNext: boolean = false;
  isCompletedEtapa: boolean = false;


//===============

  contact: Contacto = {
    apellidoMaterno: '',
    apellidoPaterno: '',
    correo: '',
    etapaActual: 0,
    etapaAnterior: -1,
    etapaSiguiente: 1,
    foto: '',
    idContacto: 0,
    nombre: '',
    telefono: 0,
    fecha: new Date()
  };

  taskUser: EtapaContacto = {
    idEtapaActual: 0,
    idEtapaAnterior: 0,
    idEtapaSiguiente: 0,
    nombreEtapaActual: '',
    nombreEtapaAnterior: '',
    nombreEtapaSiguiente: '',
    porcentajeEtapaActual: 0,
    valorBarEtapaActual: 0
  };

  contacts: Contacto[] = [];
  tasks: Task[] = [];

  taskCounter: number = 0;
  taskCounterCompleted: number = 0;


  constructor(private route: ActivatedRoute, private alertController: AlertController, private asistenteService: AsistenteVirtualService) {}

  ngOnInit() {
    this.obtenerEtapas();
    this.obtenerInfoContacto();
  }

  /**
   * TODO: Metodo para obtener las etapas registradas
   * @return void
   * */
  private obtenerEtapas(): void {
    this.etapasSeguimiento = this.asistenteService.getEtapas();
    if ( this.etapasSeguimiento.code !== AsistenteVirtualConstants.CODE_200 ) {
      console.log("Refresca la pantalla: ",this.etapasSeguimiento.message);
    }
  }

  /**
   * TODO: Metodo para obtener la informacion del contacto
   * @return void
   * */
  private obtenerInfoContacto() {
    const contactId: string = this.route.snapshot.paramMap.get('id') || "0";
    console.log("Recibiendo ID Contacto: ", contactId);
    this.infoContacto = this.asistenteService.getInfoUsuarioByID(parseInt(contactId));
    console.log("Datos Contacto: ", this.infoContacto);
    if ( this.infoContacto.code === AsistenteVirtualConstants.CODE_200 ) {
      this.isCompletedEtapa = (this.infoContacto.contacto?.etapaActual === 8);
      const etapaAnterior: number = this.infoContacto.contacto?.etapaAnterior || 0;
      const etapaActual: number = this.infoContacto.contacto?.etapaActual || 0;
      const etapaSiguiente: number = this.infoContacto.contacto?.etapaSiguiente || 0;
      console.log("obtenerInfoContacto Anterior: ", etapaAnterior);
      console.log("obtenerInfoContacto Actual: ", etapaActual);
      console.log("obtenerInfoContacto Siguiente: ", etapaSiguiente);
      this.obtenerDescripcionEtapas(etapaAnterior,etapaActual,etapaSiguiente);
    } else {
      console.log("Refresca la pantalla: ",this.infoContacto.code);
    }
  }

  /**
   * TODO: Metodo para obtener la descripcion de las etapas
   * @return void
   * */
  private obtenerDescripcionEtapas(etapaAnterior:number,etapaActual:number,etapaSiguiente:number): void {
    this.descripcionEtapas = this.asistenteService.obtenerDescripcionEtapaByIDs(etapaAnterior,etapaActual,etapaSiguiente);
    console.log("Descripcion Etapas: ", this.descripcionEtapas);
    if ( this.descripcionEtapas.code === AsistenteVirtualConstants.CODE_200 ) {
      this.isBtnDisabledBack = (this.descripcionEtapas.descripcionEtapa.idEtapaAnterior === -1);
      console.log(this.isBtnDisabledBack);
    }
  }

  /**
   * TODO: Metodo para RETROCEDER a la etapa anterior
   * @return void
   * */
  public regresarEtapaAnterior(etapaAnterior:number, etapaActual:number, etapaSiguiente:number): void {
    this.descripcionEtapas = this.asistenteService.obtenerEtapaAnterior(etapaAnterior,etapaActual,etapaSiguiente);
    if ( this.descripcionEtapas.code === AsistenteVirtualConstants.CODE_200 ) {
      const contactoActualizado: Partial<Contacto> = {
        etapaAnterior: this.descripcionEtapas.descripcionEtapa.idEtapaAnterior,
        etapaActual: this.descripcionEtapas.descripcionEtapa.idEtapaActual,
        etapaSiguiente: this.descripcionEtapas.descripcionEtapa.idEtapaSiguiente
      };
      this.asistenteService.updateContacto(this.infoContacto.contacto?.idContacto || 0,contactoActualizado);
      this.obtenerInfoContacto();
    }
  }

  /**
   * TODO: Metodo para AVANZAR a la etapa siguiente
   * @return void
   * */
   public avanzarEtapaSiguiente(etapaAnterior:number, etapaActual:number, etapaSiguiente:number): void {
    if ( etapaActual === 8 ) {
      this.isBtnDisabledNext = true;
      this.isBtnDisabledBack = false;
      this.isCompletedEtapa = true;
    }
    this.descripcionEtapas = this.asistenteService.obtenerEtapaSiguiente(etapaAnterior,etapaActual,etapaSiguiente);
    if ( this.descripcionEtapas.code === AsistenteVirtualConstants.CODE_200 ) {
      const contactoActualizado: Partial<Contacto> = {
        etapaAnterior: this.descripcionEtapas.descripcionEtapa.idEtapaAnterior,
        etapaActual: this.descripcionEtapas.descripcionEtapa.idEtapaActual,
        etapaSiguiente: this.descripcionEtapas.descripcionEtapa.idEtapaSiguiente
      };
      this.asistenteService.updateContacto(this.infoContacto.contacto?.idContacto || 0,contactoActualizado);
      this.obtenerInfoContacto();
    }
  }

  /**
   * TODO: Metodo para desbloquear las etapas al finalizar el proceso
   * @return void
   * */
  public desbloquearEtapas(): void {
    this.isCompletedEtapa = false;
    this.isBtnDisabledNext = false;
    this.isBtnDisabledBack = true;
    const contactoActualizado: Partial<Contacto> = {
      etapaAnterior: AsistenteVirtualConstants.CODE_ETAPA_ANTERIOR,
      etapaActual: AsistenteVirtualConstants.CODE_ETAPA_ACTUAL,
      etapaSiguiente: AsistenteVirtualConstants.CODE_ETAPA_SIGUIENTE
    };
    this.asistenteService.updateContacto(this.infoContacto.contacto?.idContacto || 0,contactoActualizado);
    this.obtenerInfoContacto();
    this.obtenerDescripcionEtapas(AsistenteVirtualConstants.CODE_ETAPA_ANTERIOR,AsistenteVirtualConstants.CODE_ETAPA_ACTUAL,AsistenteVirtualConstants.CODE_ETAPA_SIGUIENTE);
  }

  /**
   * @description Metodo para mostrar alertas
   * @param idStatus - ID del estatus actual
   * @param opc - Opcion para confirmar si debe avanzar o regresar el estatus
 */
   public async showAlertStatus(etapaAnterior:number, etapaActual:number, etapaSiguiente:number, opc: boolean) {
     const alert = await this.alertController.create({
     header: 'Confirmar',
     message: (opc) ? AsistenteVirtualConstants.MSJ_AVANZAR_ETAPA : AsistenteVirtualConstants.MSJ_REGRESAR_ETAPA,
     buttons: [
       {
         text: 'Cancelar',
         role: 'cancel',
         cssClass: 'secondary',
         handler: () => {
          console.log('Confirmar Cancelar');
       }
       }, {
         text: (opc) ? 'Avanzar' : 'Regresar',
         handler: () => {
          switch (opc) {
            case true:
              this.avanzarEtapaSiguiente(etapaAnterior,etapaActual,etapaSiguiente);
              break;
            case false:
              this.regresarEtapaAnterior(etapaAnterior,etapaActual,etapaSiguiente);
              break;
          }
         }
       }
     ]
   });

   await alert.present();
   }

























  /*

  private updateTaskUserStatus(respStatus: any[], valueBackStatus: number, currentStatus: number, valueNextStatus: number): void {
    const respBackStatus = respStatus.find(item => item.statusTask === valueBackStatus);
    if (respBackStatus) {
      this.taskUser.backStatusName = respBackStatus.nameTask;
      this.isBtnDisabledBack = false;
    } else {
      this.isBtnDisabledBack = true;
    }

    const respCurrentStatus = respStatus.find(item => item.statusTask === currentStatus);
    if (respCurrentStatus) {
      this.taskUser.currentStatusName = respCurrentStatus.nameTask;
      this.taskUser.currentValueBar = respCurrentStatus.valueTask;
      this.taskUser.currentStatusPercentage = respCurrentStatus.percentageTask;
    }

    const respNextStatus = respStatus.find(item => item.statusTask === valueNextStatus);
    if (respNextStatus) {
      this.taskUser.nextStatusName = respNextStatus.nameTask;
    }
  }*/


  /*private searchStatusByID(...statuses: number[]): Task[] {
    return this.tasks.filter(task => statuses.includes(task.statusTask));
  }*/





}
