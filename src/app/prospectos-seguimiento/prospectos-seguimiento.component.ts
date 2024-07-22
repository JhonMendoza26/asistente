import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '@app/interface/contact';
import { StatusTask } from '@app/interface/status-task';
import { Task } from '@app/interface/task';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-prospectos-seguimiento',
  templateUrl: './prospectos-seguimiento.component.html',
  styleUrls: ['./prospectos-seguimiento.component.scss']
})
export class ProspectosSeguimientoComponent implements OnInit {

  contact: Contact = {
    id: '', name: '', photo: '', phone: '', email: '', backStatusTask: -1, currentStatusTask: 0, nextStatusTask: 1
  };

  public taskUser: StatusTask = {
    backStatusID: 0, backStatusName: '',
    currentStatusID: 1, currentStatusName: '', currentValueBar: '0', currentStatusPercentage: 0,
    nextStatusID: 2, nextStatusName: ''
  };

  contacts: Contact[] = [];
  tasks: Task[] = [];

  taskCounter: number = 0;
  taskCounterCompleted: number = 0;
  isBtnDisabledBack: boolean = true;

  constructor(private route: ActivatedRoute, private alertController: AlertController) {}

  ngOnInit() {
    //Obtener tareas
    this.getTask();
    this.getInfoUsuario();
  }

  /**
   * @description Metodo para obtener la informacion del contacto
   */
  public getInfoUsuario(): void {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      this.contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      if(this.contacts){
        this.contact = this.contacts.find(contact => contact.id === contactId) || this.contact;
        this.getDescriptionStatus(this.contact.currentStatusTask);
      } else {
        console.log("No se encontro al usuario, intentalo de nuevo");
      }
    }
  }

  /**
   * @description Metodo para regresar al estatus anterior
  */
  public handleBackStatusContact(idBackStatus: number) {
    console.log("Back click: ", idBackStatus);
    this.showAlertStatus(idBackStatus,false);
  }

  /**
   * @description Metodo para avanzar al estatus siguiente
  */
  public handleNextStatusContact(idNextStatus: number){
    console.log("Next click: ", idNextStatus);
    this.showAlertStatus(idNextStatus,true);
  }

  /**
   * @description Metodo para obtener
   * @param idStatus
   */
  private getDescriptionStatus(currentStatus: number): void {
    try {
      let valueBackStatus: number = 0;
      let valueCurrentStatus: number = 0;
      let valueNextStatus: number = 0;

      if ( currentStatus === -1 ) {
        valueBackStatus = -1;
        valueCurrentStatus = 0;
        valueNextStatus = 1;
      } else {
        valueBackStatus = currentStatus - 1;
        valueCurrentStatus = currentStatus;
        valueNextStatus = currentStatus + 1;
      }

      const respStatus = this.searchStatusByID(valueBackStatus,currentStatus,valueNextStatus);
      if ( respStatus.length === 0 ) {
        console.log("Error al obtener los estatus del usuario");
        return;
      }

      const respBackStatus = respStatus.find(item => item.statusTask === valueBackStatus);
        if ( respBackStatus !=null ) {
          this.taskUser.backStatusName = respBackStatus.nameTask;
          this.isBtnDisabledBack = false;
        } else {
          this.isBtnDisabledBack = true;
        }
      const respCurrentStatus = respStatus.find(item => item.statusTask === currentStatus);
        if ( respCurrentStatus != null ) {
          this.taskUser.currentStatusName = respCurrentStatus.nameTask;
          this.taskUser.currentValueBar = respCurrentStatus.valueTask;
          this.taskUser.currentStatusPercentage = respCurrentStatus.percentageTask;
        }
      const respNextStatus = respStatus.find(item => item.statusTask === valueNextStatus);
        if ( respNextStatus != null ) {
          this.taskUser.nextStatusName = respNextStatus.nameTask;
        }

      this.updateStatusContact(valueBackStatus,valueCurrentStatus,valueNextStatus);

    } catch (error) {
      console.log("Hubo un error");
    }
  }

  /*private getDescriptionStatus(currentStatus: number): void {
    try {
      const { valueBackStatus, valueCurrentStatus, valueNextStatus } = this.calculateStatusValues(currentStatus);

      const respStatus = this.searchStatusByID(valueBackStatus, valueCurrentStatus, valueNextStatus);
      if (!respStatus.length) {
        console.log("Error al obtener los estatus del usuario");
        return;
      }

      this.updateTaskUserStatus(respStatus, valueBackStatus, valueCurrentStatus, valueNextStatus);
      this.updateStatusContact(valueBackStatus, valueCurrentStatus, valueNextStatus);

    } catch (error) {
      console.error("Hubo un error:", error);
    }
  }

  private calculateStatusValues(currentStatus: number): { valueBackStatus: number, valueCurrentStatus: number, valueNextStatus: number } {
    if (currentStatus === -1) {
      return { valueBackStatus: -1, valueCurrentStatus: 0, valueNextStatus: 1 };
    } else {
      return {
        valueBackStatus: currentStatus,
        valueCurrentStatus: currentStatus - 1,
        valueNextStatus: currentStatus + 1
      };
    }
  }

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


  private searchStatusByID(...statuses: number[]): Task[] {
    return this.tasks.filter(task => statuses.includes(task.statusTask));
  }

  /**
   * @description Metodo para mostrar alertas
   * @param idStatus - ID del estatus actual
   * @param opc - Opcion para confirmar si debe avanzar o regresar el estatus
   */
  private async showAlertStatus(idStatus: number, opc: boolean) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: (opc) ? '¿Estás seguro de avanzar al siguiente estatus?' : '¿Estás seguro de regresar al siguiente estatus?',
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
            this.getDescriptionStatus(idStatus);
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * @description Metodo para actualizar la informacion del Contacto
   * @param idContacto - ID del contacto a actualizar
   * @returns Contacto actualizado
   */
  private updateStatusContact(backStatus:number, currentStatus:number, nextStatus:number): void {
    try {
      const contacts: Contact[] = JSON.parse(localStorage.getItem('contacts') || '[]');
      const contactInfo = contacts.find(item => item.id === this.contact.id);
      if ( contactInfo!= null ) {
        contactInfo.backStatusTask = backStatus;
        contactInfo.currentStatusTask = currentStatus;
        contactInfo.nextStatusTask = nextStatus;
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }

    } catch (error) {
      console.log("Se ha producido un error: " + error);
    }
  }




















  /*handleButtonClick(status: number):void {
    console.log("Task Counter: " + this.taskCounterCompleted);
    this.getStatusProspecto(status);
  }*/

  /**
   * @description Obtiene la descripcion del estatus anterior y siguiente por ID de contacto
   * @param idBackStatus - ID del estatus anterior
   * @param idNextStatus - ID del estatus siguiente
   * @returns Descripcion estatus
   */
  /*getStatusProspecto(status:number):void {
    //Obtener tareas
    this.taskCounter = this.tasks.length;
    //Buscar tarea de acuerdo al estatus del usuario
    const responseTask = this.tasks.find(task => task.statusTask === status);
    //Validamos si encontro la tarea, sino mostramos mensaje de error
    if(responseTask) {
      //Valores de la primer tarea
      this.taskUser.firstNameTask = responseTask.nameTask;
      this.taskUser.firstValueBarTaks = responseTask.valueTask || '0.15';
      this.taskUser.firstPercentageTask = responseTask.percentageTask || '15';

      //valores de la siguiente tarea
      const responseNextTask = this.tasks.find(task => task.statusTask === status + 1);
      if(responseNextTask){
        this.taskUser.nextNameTask = responseNextTask.nameTask;
        this.taskUser.nextStatusTask = status + 1;
        this.taskCounterCompleted += 1;
      }else {
        console.log("Ocurrio un error al obtener la siguiente tarea");
      }
    } else {
      console.log("No se encontraron datos para el usuario");
    }
  }*/

  getTask():void {
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    if(!this.tasks){
      console.log("Ocurrio un error al obtener las tareas");
    }
  }

  /*
    Alerta de confirmaciones de acciones
  */
    async updateStatusContactAlert(contact: Contact) {
      const alert = await this.alertController.create({
        header: 'Confirmar',
        message: '¿Estás seguro de eliminar el contacto?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirmar Cancelar');
            }
          }, {
            text: 'Eliminar',
            handler: () => {
              //
            }
          }
        ]
      });

      await alert.present();
    }




}
