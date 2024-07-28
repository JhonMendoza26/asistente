import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Contacto } from '@app/interface/contacto';

@Component({
  selector: 'app-prospectos',
  templateUrl: './prospectos.component.html',
  styleUrls: ['./prospectos.component.scss']
})
export class ProspectosComponent implements OnInit {

  contacts: Contacto[] = [];

  groupedContacts: { [key: string]: any[] } = {};

  constructor(private navCtrl: NavController) {
    this.groupContacts();
  }

  ngOnInit(): void {
  }

  @Output() contactClick = new EventEmitter<any>();

  groupContacts() {
    this.groupedContacts = {};
    this.contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    this.contacts.forEach(contact => {
      const letter = contact.nombre.charAt(0).toUpperCase();
      if (!this.groupedContacts[letter]) {
        this.groupedContacts[letter] = [];
      }
      this.groupedContacts[letter].push(contact);
    });
  }

  onContactClick(contact: Contacto) {
    this.navCtrl.navigateForward(`/prospecto-detalle/${contact.idContacto}`);
  }

  addContact() {
    this.navCtrl.navigateForward('/prospecto-editar/new');
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      event.target.complete();
      this.groupContacts();
      console.log("Refresh page");
    }, 2000);
  }

}
