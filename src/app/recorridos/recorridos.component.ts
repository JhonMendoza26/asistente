import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { AsistenteVirtualService } from '@app/services/asistente-virtual.service';
import { Contacto } from '@app/interface/contacto';
import { AsistenteVirtualConstants } from '@app/constants/asistente-virtual';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Alertas } from '@app/interface/alertas';
import { RecordatorioComponent } from '@app/recordatorio/recordatorio.component';

@Component({
  selector: 'app-recorridos',
  templateUrl: './recorridos.component.html',
  styleUrls: ['./recorridos.component.scss'],
})
export class RecorridosComponent implements OnInit {
  totalUsers: number = 0;
  totalUsersInactivos: number = 0;

  contacts: Contacto[] = [];
  alertSuggestions: Alertas[] = [];

  public resultContacts: Contacto[] = [...this.contacts];

  constructor(
    private asistenteVirtualService: AsistenteVirtualService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.obtenerProspectoByEtapa();
  }

  downloadReport() {
    const doc = new jsPDF();
    doc.text('Reporte de Usuarios', 10, 10);
    // Agregar más contenido al PDF según sea necesario
    doc.save('reporte.pdf');
  }

  obtenerProspectoByEtapa(): void {
    this.contacts = this.asistenteVirtualService.getProspectosByEtapa(
      AsistenteVirtualConstants.ETAPA_RECORRIDO_INICIAL
    );
    this.resultContacts = [...this.contacts];
    this.alertSuggestions = this.getSuggestions(this.contacts);
    this.totalUsers = this.contacts.length;
    this.showSuggestionsAsToasts();
    this.totalUsersInactivos = this.alertSuggestions.length;
  }

  contactarProspecto(idContacto: number): void {
    this.navCtrl.navigateForward(`/contactar-prospecto/${idContacto}`);
  }

  filtrarProspecto(event: any): void {
    const query = event.target.value.toLowerCase();
    this.resultContacts = this.contacts.filter((contact: Contacto) => {
      return contact.nombre.toLowerCase().indexOf(query) > -1;
    });
  }

  /**
   * Asistente
   * */
  handleRefresh(event: any): void {
    setTimeout(() => {
      event.target.complete();
      this.obtenerProspectoByEtapa();
      console.log('Refresh page recorridos');
    }, 2000);
  }

  getSuggestions(users: Contacto[]): Alertas[] {
    let suggestions: Alertas[] = [];
    users.forEach((user) => {
      // Ejemplo: Detectar usuarios inactivos por más de 30 días
      if (this.isUserInactive(user)) {
        this.resultContacts = this.resultContacts.map((contact) => {
          if (contact.idContacto === user.idContacto) {
            return { ...contact, isInactivo: true };
          }
          return contact;
        });
        console.log('Uusarios inactivos: ' + JSON.stringify(this.resultContacts));
        suggestions.push({
          userId: user.idContacto,
          suggestion: `El usuario ${user.nombre} ha estado inactivo por más de 30 días. Considera contactarlo.`,
        });
      }

      // Ejemplo: Detectar usuarios estancados en la etapa de Seguimiento
      if (this.isUserStuckInStage(user)) {
        suggestions.push({
          userId: user.idContacto,
          suggestion: `El usuario ${user.nombre} ha estado en Seguimiento por más de 60 días. Revisa posibles cuellos de botella.`,
        });
      }
    });

    return suggestions;
  }

  private isUserInactive(user: Contacto): boolean {
    console.log('User ID: ' + user.idContacto);
    const now: Date = new Date();
    const lastInteraction: Date = new Date(user.fecha);
    const diffInDays: number = (now.getTime() - lastInteraction.getTime()) / (1000 * 3600 * 24);
    console.log('DiffInDays: ' + diffInDays);
    return diffInDays > 0.005;
  }

  private isUserStuckInStage(user: Contacto): boolean {
    const now: Date = new Date();
    const stageStartDate: Date = new Date(user.fecha);
    const diffInDays: number = (now.getTime() - stageStartDate.getTime()) / (1000 * 3600 * 24);
    return diffInDays > 60;
  }

  private deleteUsuario(idUsuario: number): void {
    console.log('Eliminando cliente: ' + idUsuario);
    // Recupera los registros del LocalStorage
    const storedContacts = localStorage.getItem('contacts');

    if (storedContacts) {
      // Parsea los registros en formato JSON
      const contacts = JSON.parse(storedContacts);

      // Filtra el registro con el ID especificado
      const updatedContacts = contacts.filter((contact: { idContacto: number }) => contact.idContacto !== idUsuario);

      // Guarda los registros actualizados en el LocalStorage
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));

      // Actualiza la vista (si es necesario)
      //this.contacts = updatedContacts;  // Asume que tienes una variable `contacts` en tu componente
      this.obtenerProspectoByEtapa();
    }
  }

  async showSuggestionsAsToasts() {
    for (let suggestion of this.alertSuggestions) {
      const toast = await this.toastController.create({
        header: 'Clientes inactivos',
        message: `<p>${suggestion.suggestion}</p>`,
        cssClass: 'custom-toast-header',
        duration: 100000, // Duración en milisegundos
        position: 'top',
        //icon: 'alert-circle-outline',
        color: 'dark',
        layout: 'stacked',
        buttons: [
          {
            text: 'Dar de baja',
            role: 'danger',
            handler: () => {
              this.deleteUsuario(suggestion.userId);
            },
          },
          {
            text: 'Contactar',
            role: 'info',
            cssClass: 'colorbtn',
            handler: () => {
              this.contactarProspecto(suggestion.userId);
            },
          },
          {
            text: 'Cerrar',
            role: 'cancel',
          },
        ],
      });
      await toast.present();
    }
  }

  crearRecordatorio() {
    console.log('Creando recordatorio');
    this.navCtrl.navigateForward(`/recordatorio`);
  }

  async openReminderModal() {
    const modal = await this.modalController.create({
      component: RecordatorioComponent,
      //componentProps: { user }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.selectedDate) {
        //this.createReminder(user, result.data.selectedDate);
        console.log('Algo debe hacer aqui');
      }
    });

    return await modal.present();
  }
}
