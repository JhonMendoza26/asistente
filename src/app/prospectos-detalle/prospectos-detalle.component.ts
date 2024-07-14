import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '@app/interface/contact';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-prospectos-detalle',
  templateUrl: './prospectos-detalle.component.html',
  styleUrls: ['./prospectos-detalle.component.scss']
})
export class ProspectosDetalleComponent implements OnInit {
  contact: Contact = { id: '', name: '', photo: '', phone: '', email: '' };
  isNewContact: boolean = false;

  constructor(private route: ActivatedRoute, private navCtrl: NavController) {}

  ngOnInit() {
    //const contactId = this.route.snapshot.paramMap.get('id') ?? '';
    // Aquí podrías obtener el contacto de una API o un servicio
    //this.contact = { id: contactId, name: 'Juan Pérez', photo: 'assets/img/profile1.jpg', phone: '123456789', email: 'juan.perez@example.com' };
    //this.contact = this.getContactById(contactId);
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId === 'new') {
      this.isNewContact = true;
    } else if (contactId) {
      const contacts: Contact[] = JSON.parse(localStorage.getItem('contacts') || '[]');
      this.contact = contacts.find(contact => contact.id === contactId) || this.contact;
    }
  }

  getContactById(id: string) {
    const contacts = [
      { id: '1', name: 'Juan Pérez Hernandez', photo: 'assets/img/user1.png', phone: '123456789', email: 'juan.perez@example.com' },
      { id: '2', name: 'María García Garcia', photo: 'assets/img/user2.png', phone: '987654321', email: 'maria.garcia@example.com' },
      { id: '3', name: 'Maria Espinoza Mendez', photo: 'assets/img/user3.png', phone: '987623461', email: 'maria.espinoza@example.com' },
      { id: '4', name: 'Noemi Gutierrez Escobar', photo: 'assets/img/user4.png', phone: '7814234321', email: 'noemi.gutierrez@example.com' },
      // Más contactos...
    ];
    return contacts.find(contact => contact.id === id);
  }

  editContact(contact: Contact) {
    this.navCtrl.navigateForward(`/prospecto-editar/${contact.id}`);
  }

  deleteContact(contact: Contact) {
    let contacts: Contact[] = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts = contacts.filter(item => item.id !== contact.id);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    this.navCtrl.navigateBack('/prospectos');
  }

  goToSeguimiento(contact: any) {
    this.navCtrl.navigateForward(`/prospecto-seguimiento/${contact.id}`);
  }

  formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/[^0-9]/g, '');
    const areaCode = cleaned.slice(0,3);
    const localNumber = cleaned.slice(3,6) + '-' + cleaned.slice(6,10);

    return `(${areaCode}) ${localNumber}`;
  }











  openWhatsApp(contact: any) {
    // Lógica para abrir WhatsApp
  }

  sendEmail(contact: any) {
    // Lógica para enviar email
  }

}
