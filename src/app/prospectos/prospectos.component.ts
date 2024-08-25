import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Contacto } from '@app/interface/contacto';

@Component({
  selector: 'app-prospectos',
  templateUrl: './prospectos.component.html',
  styleUrls: ['./prospectos.component.scss'],
})
export class ProspectosComponent implements OnInit {
  contacts: Contacto[] = [];
  agendaContactos: { letraInicial: string; contactos: Contacto[] }[] = [];
  filtroContactos: { letraInicial: string; contactos: Contacto[] }[] = [];

  constructor(private navCtrl: NavController) {
    this.agruparContactos();
    this.filtroContactos = this.agendaContactos;
  }

  ngOnInit(): void {}

  @Output() contactClick = new EventEmitter<any>();

  agruparContactos() {
    const grupos: { [key: string]: Contacto[] } = {};
    this.contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    this.contacts.forEach((contacto) => {
      const letraInicial: string = contacto.nombre.charAt(0).toUpperCase();
      if (!grupos[letraInicial]) {
        grupos[letraInicial] = [];
      }
      grupos[letraInicial].push(contacto);
    });

    this.agendaContactos = Object.keys(grupos)
      .sort()
      .map((letraInicial) => {
        return {
          letraInicial,
          contactos: grupos[letraInicial].sort((a, b) => a.nombre.localeCompare(b.nombre)),
        };
      });
  }

  onContactClick(idContacto: number): void {
    this.navCtrl.navigateForward(`/prospecto-detalle/${idContacto}`);
  }

  addContact() {
    this.navCtrl.navigateForward('/prospecto-editar/new');
  }

  handleRefresh(event: any): void {
    setTimeout(() => {
      event.target.complete();
      this.agruparContactos();
      console.log('Refresh page');
    }, 2000);
  }

  /*filtrateProspect(event:any): void {
    const query = event.target.value.toLowerCase();
    this.resultContacts = this.contacts.filter((contact: Contacto) => {
      return contact.nombre.toLowerCase().indexOf(query) > -1;
    });
  }*/

  filtrarContactos(event: any) {
    const query = event.target.value.toLowerCase();
    this.filtroContactos = this.agendaContactos
      .map((grupo) => {
        const contactosFiltrados: Contacto[] = grupo.contactos.filter((contacto) =>
          contacto.nombre.toLowerCase().includes(query)
        );
        return { letraInicial: grupo.letraInicial, contactos: contactosFiltrados };
      })
      .filter((grupo) => grupo.contactos.length > 0);
  }
}
