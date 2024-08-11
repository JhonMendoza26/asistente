import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { AsistenteVirtualService } from '@app/services/asistente-virtual.service';
import { ActivatedRoute } from '@angular/router';
import { Contacto } from '@app/interface/contacto';
import { AsistenteVirtualConstants } from '@app/constants/asistente-virtual';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recorridos',
  templateUrl: './recorridos.component.html',
  styleUrls: ['./recorridos.component.scss']
})
export class RecorridosComponent implements OnInit {

  totalUsers: number = 0;

  contacts: Contacto[] = [];

  public resultContacts: Contacto[] = [...this.contacts];

  constructor(private route: ActivatedRoute, private asistenteVirtualService: AsistenteVirtualService,
              private navCtrl: NavController) {
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
    this.resultContacts = [...this.contacts];
    this.totalUsers = this.contacts.length;
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

}
