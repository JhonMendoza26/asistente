import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '@app/interface/contact';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-prospectos-editar',
  templateUrl: './prospectos-editar.component.html',
  styleUrls: ['./prospectos-editar.component.scss']
})
export class ProspectosEditarComponent implements OnInit {

  contact: Contact = {
    id: '', name: '', photo: 'assets/img/user1.png', phone: '', email: '',
    backStatusTask: -1, currentStatusTask: 0, nextStatusTask: 1
  };
  isNewContact: boolean = false;
  @Output() contactSaved = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute, private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId === 'new') {
      this.isNewContact = true;
    } else if (contactId) {
      const contacts: Contact[] = JSON.parse(localStorage.getItem('contacts') || '[]');
      this.contact = contacts.find(contact => contact.id === contactId) || this.contact;
    }
  }

  /**
   * @description Metodo para guardar informacion del contacto
   * @returns
   */
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

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: this.isNewContact ? '¿Estás seguro de crear el contacto?' : '¿Estás seguro de editar el contacto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirmar Cancelar');
          }
        }, {
          text: 'Guardar',
          handler: () => {
            this.saveContact();
          }
        }
      ]
    });

    await alert.present();
  }


}
