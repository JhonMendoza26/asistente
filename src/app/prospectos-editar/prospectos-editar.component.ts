import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Contacto } from '@app/interface/contacto';

@Component({
  selector: 'app-prospectos-editar',
  templateUrl: './prospectos-editar.component.html',
  styleUrls: ['./prospectos-editar.component.scss']
})
export class ProspectosEditarComponent implements OnInit {

  contact: Contacto = {
    apellidoMaterno: '',
    apellidoPaterno: '',
    correo: '',
    etapaActual: 0,
    etapaAnterior: -1,
    etapaSiguiente: 1,
    foto: 'assets/img/user1.png',
    idContacto: 0,
    nombre: '',
    telefono: 0,
    fecha: new Date()
  };
  isNewContact: boolean = false;
  @Output() contactSaved = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute, private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    try{
      const contactId = this.route.snapshot.paramMap.get('id');
      if (contactId === 'new') {
        this.isNewContact = true;
      } else if (contactId) {
        const contacts: Contacto[] = JSON.parse(localStorage.getItem('contacts') || '[]');
        this.contact = contacts.find(contact => parseInt(contactId) === contact.idContacto) || this.contact;
      }
    }catch (error) {
      console.error("Error al consultar datos de usuario: ",error);
    }
  }

  /**
   * @description Metodo para guardar informacion del contacto
   * @returns
   */
  saveContact() {
    let contacts: Contacto[] = JSON.parse(localStorage.getItem('contacts') || '[]');
    if (this.isNewContact) {
      this.contact.idContacto = parseInt(new Date().getTime().toString());
      contacts.push(this.contact);
    } else {
      contacts = contacts.map(contact => contact.idContacto === this.contact.idContacto ? this.contact : contact);
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
