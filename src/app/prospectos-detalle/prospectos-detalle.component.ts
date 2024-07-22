import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '@app/interface/contact';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-prospectos-detalle',
  templateUrl: './prospectos-detalle.component.html',
  styleUrls: ['./prospectos-detalle.component.scss']
})
export class ProspectosDetalleComponent implements OnInit {
  contact: Contact = {
    id: '', name: '', photo: '', phone: '', email: '', backStatusTask: -1, currentStatusTask:0, nextStatusTask: 1
  };
  isNewContact: boolean = false;

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

  editContact(contact: Contact) {
    this.navCtrl.navigateForward(`/prospecto-editar/${contact.id}`);
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

  /*
    TODO: Metodo para eliminar prospecto
    @param contact - Objeto que contiene la informacion del contacto
    @return Contacto eliminado
  */
    deleteContact(contact: Contact) {
      let contacts: Contact[] = JSON.parse(localStorage.getItem('contacts') || '[]');
      contacts = contacts.filter(item => item.id !== contact.id);
      localStorage.setItem('contacts', JSON.stringify(contacts));
      this.navCtrl.navigateBack('/prospectos');
    }

  /*
    Alerta para confirmar la eliminación del contacto
  */
    async deleteContactAlert(contact: Contact) {
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
            }
          }, {
            text: 'Eliminar',
            handler: () => {
              this.deleteContact(contact);
            }
          }
        ]
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
