import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contact } from '@app/interface/contact';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-prospectos',
  templateUrl: './prospectos.component.html',
  styleUrls: ['./prospectos.component.scss']
})
export class ProspectosComponent implements OnInit {

  /*contacts = [
    { id: 1, name: 'Juan Pérez Hernandez', photo: 'assets/img/user1.png' },
    { id: 2, name: 'María García Garcia', photo: 'assets/img/user2.png' },
    { id: 3, name: 'Maria Espinoza Mendez', photo: 'assets/img/user3.png' },
    { id: 4, name: 'Noemi Gutierrez Escobar', photo: 'assets/img/user4.png' },
  ];*/
  contacts: Contact[] = [];

  groupedContacts: { [key: string]: any[] } = {};

  constructor(private navCtrl: NavController) {
    console.log('Iniciando component Prospectos - constructor');
    this.groupContacts();
  }

  ngOnInit(): void {
    console.log('Iniciando component Prospectos - ngOnInit');
  }

  @Output() contactClick = new EventEmitter<any>();

  groupContacts() {
    this.groupedContacts = {};
    this.contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    this.contacts.forEach(contact => {
      const letter = contact.name.charAt(0).toUpperCase();
      if (!this.groupedContacts[letter]) {
        this.groupedContacts[letter] = [];
      }
      this.groupedContacts[letter].push(contact);
    });
  }

  onContactClick(contact: any) {
    this.navCtrl.navigateForward(`/prospecto-detalle/${contact.id}`);
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
