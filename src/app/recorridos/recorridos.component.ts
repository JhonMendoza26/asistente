import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { AsistenteVirtualService } from '@app/services/asistente-virtual.service';
import { ActivatedRoute } from '@angular/router';
import { Contacto } from '@app/interface/contacto';
import { AsistenteVirtualConstants } from '@app/constants/asistente-virtual';
import { NavController, ToastController } from '@ionic/angular';
import { Alertas } from '@app/interface/alertas';

@Component({
  selector: 'app-recorridos',
  templateUrl: './recorridos.component.html',
  styleUrls: ['./recorridos.component.scss']
})
export class RecorridosComponent implements OnInit {

  totalUsers: number = 0;

  contacts: Contacto[] = [];
  alertSuggestions: Alertas[] = [];

  public resultContacts: Contacto[] = [...this.contacts];

  constructor(private route: ActivatedRoute, private asistenteVirtualService: AsistenteVirtualService,
              private navCtrl: NavController, private toastController: ToastController) {
  }

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
    this.contacts = this.asistenteVirtualService.getProspectosByEtapa(AsistenteVirtualConstants.ETAPA_RECORRIDO_INICIAL);
    this.alertSuggestions = this.getSuggestions(this.contacts);
    this.resultContacts = [...this.contacts];
    this.totalUsers = this.contacts.length;
    this.showSuggestionsAsToasts();
  }

  contactarProspecto(idContacto: number): void {
    this.navCtrl.navigateForward(`/contactar-prospecto/${idContacto}`);
  }

  filtrarProspecto(event:any): void {
    const query = event.target.value.toLowerCase();
    this.resultContacts = this.contacts.filter((contact: Contacto) => {
      return contact.nombre.toLowerCase().indexOf(query) > -1;
    });
  }

  /**
   * Asistente
   * */
  handleRefresh(event:any): void {
    setTimeout(() => {
      event.target.complete();
      this.obtenerProspectoByEtapa();
      console.log("Refresh page recorridos");
    }, 2000);
  }

  getSuggestions(users: Contacto[]): Alertas[] {
    let suggestions: Alertas[] = [];
    users.forEach(user => {
      // Ejemplo: Detectar usuarios inactivos por más de 30 días
      if (this.isUserInactive(user)) {
        suggestions.push({
          userId: user.idContacto,
          suggestion: `El usuario ${user.nombre} ha estado inactivo por más de 30 días. Considera contactarlo.`
        });
      }

      // Ejemplo: Detectar usuarios estancados en la etapa de Seguimiento
      if (this.isUserStuckInStage(user)) {
        suggestions.push({
          userId: user.idContacto,
          suggestion: `El usuario ${user.nombre} ha estado en Seguimiento por más de 60 días. Revisa posibles cuellos de botella.`
        });
      }
    });

    return suggestions;
  }

  private isUserInactive(user: Contacto): boolean {
    const now: Date = new Date();
    const lastInteraction: Date = new Date(user.fecha);
    const diffInDays: number = (now.getTime() - lastInteraction.getTime()) / (1000 * 3600 * 24);
    return diffInDays > 0.01;
  }

  private isUserStuckInStage(user: Contacto): boolean {
    const now: Date = new Date();
    const stageStartDate: Date = new Date(user.fecha);
    const diffInDays: number = (now.getTime() - stageStartDate.getTime()) / (1000 * 3600 * 24);
    return diffInDays > 60;
  }

  async showSuggestionsAsToasts() {
    for (let suggestion of this.alertSuggestions) {
      const toast = await this.toastController.create({
        message: `${suggestion.suggestion}`,
        duration: 10000,  // Duración en milisegundos
        position: 'top',
        buttons: [
          {
            text: 'Contactar',
            handler: () => {
              //this.contactUser(suggestion.userId);
              console.log("Contacto usuario por alerta");
              this.contactarProspecto(suggestion.userId);
            }
          },
          {
            text: 'Cerrar',
            role: 'cancel'
          }
        ]
      });
      await toast.present();
    }
  }



}
