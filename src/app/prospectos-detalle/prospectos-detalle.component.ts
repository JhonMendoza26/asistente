import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Contacto } from '@app/interface/contacto';

@Component({
  selector: 'app-prospectos-detalle',
  templateUrl: './prospectos-detalle.component.html',
  styleUrls: ['./prospectos-detalle.component.scss'],
})
export class ProspectosDetalleComponent implements OnInit {
  contact: Contacto = {
    apellidoMaterno: '',
    apellidoPaterno: '',
    correo: '',
    etapaActual: 0,
    etapaAnterior: 0,
    etapaSiguiente: 0,
    foto: '',
    idContacto: 0,
    nombre: '',
    telefono: 0,
    isInactivo: false,
    fecha: new Date(),
  };
  isNewContact: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId === 'new') {
      this.isNewContact = true;
    } else if (contactId) {
      const contacts: Contacto[] = JSON.parse(localStorage.getItem('contacts') || '[]');
      this.contact = contacts.find((contact) => contact.idContacto === parseInt(contactId)) || this.contact;
    }
  }

  editContact(contact: Contacto) {
    this.navCtrl.navigateForward(`/prospecto-editar/${contact.idContacto}`);
  }

  goToSeguimiento(idContact: number) {
    this.navCtrl.navigateForward(`/prospecto-seguimiento/${idContact}`);
  }

  formatPhoneNumber(phone: number): string {
    const cleaned = phone.toString().replace(/[^0-9]/g, '');
    const areaCode = cleaned.slice(0, 3);
    const localNumber = cleaned.slice(3, 6) + '-' + cleaned.slice(6, 10);

    return `(${areaCode}) ${localNumber}`;
  }

  /*
    TODO: Metodo para eliminar prospecto
    @param contact - Objeto que contiene la informacion del contacto
    @return Contacto eliminado
  */
  deleteContact(contact: Contacto) {
    let contacts: Contacto[] = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts = contacts.filter((item) => item.idContacto !== contact.idContacto);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    this.navCtrl.navigateBack('/prospectos');
  }

  /*
    TODO: Alerta para confirmar la eliminación del contacto
    @param contact Objeto que contiene la informacion del contacto
  */
  async deleteContactAlert(contact: Contacto) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de eliminar el contacto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirmar Cancelar');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteContact(contact);
          },
        },
      ],
    });
    await alert.present();
  }

  openWhatsApp(contact: any) {
    // Lógica para abrir WhatsApp
  }

  sendEmail(contact: any) {
    // Lógica para enviar email
  }
}
