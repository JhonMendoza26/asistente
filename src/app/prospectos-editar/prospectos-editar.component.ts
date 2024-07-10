import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '@app/interface/contact';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-prospectos-editar',
  templateUrl: './prospectos-editar.component.html',
  styleUrls: ['./prospectos-editar.component.scss']
})
export class ProspectosEditarComponent implements OnInit {

  contact: Contact = { id: '', name: '', photo: 'assets/img/user1.png', phone: '', email: '' };
  isNewContact: boolean = false;
  @Output() contactSaved = new EventEmitter<void>();

  constructor(private route: ActivatedRoute, private navCtrl: NavController) {}

  ngOnInit() {
    const contactId = this.route.snapshot.paramMap.get('id');
    console.log('Param Edit: ' + contactId);
    if (contactId === 'new') {
      this.isNewContact = true;
    } else if (contactId) {
      const contacts: Contact[] = JSON.parse(localStorage.getItem('contacts') || '[]');
      this.contact = contacts.find(contact => contact.id === contactId) || this.contact;
    }
  }

  saveContact() {
    let contacts: Contact[] = JSON.parse(localStorage.getItem('contacts') || '[]');
    if (this.isNewContact) {
      this.contact.id = new Date().getTime().toString();
      contacts.push(this.contact);
    } else {
      contacts = contacts.map(contact => contact.id === this.contact.id ? this.contact : contact);
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
    this.contactSaved.emit();
    this.navCtrl.navigateBack('/prospectos');
  }

}
