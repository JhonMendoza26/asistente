import { Component, OnInit } from '@angular/core';
import { Contacto } from '@app/interface/contacto';
import { ActivatedRoute } from '@angular/router';
import { AsistenteVirtualService } from '@app/services/asistente-virtual.service';
import { NavController } from '@ionic/angular';
import jsPDF from 'jspdf';
import { AsistenteVirtualConstants } from '@app/constants/asistente-virtual';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss']
})
export class OfertaComponent implements OnInit {

  totalUsers: number = 0;

  contacts: Contacto[] = [];

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
    this.contacts = this.asistenteVirtualService.getProspectosByEtapa(AsistenteVirtualConstants.ETAPA_OFERTA);
    this.totalUsers = this.contacts.length;
  }

  contactarProspecto(idContacto: number): void {
    this.navCtrl.navigateForward(`/contactar-prospecto/${idContacto}`);
  }

}
