import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contactar-prospecto',
  templateUrl: './contactar-prospecto.component.html',
  styleUrls: ['./contactar-prospecto.component.scss'],
})
export class ContactarProspectoComponent implements OnInit {
  selectedMessage: string = '';
  newMessageText: string = '';
  isAddingNewMessage: boolean = false;
  customMessages = [
    { text: 'Rick Astley', originalText: 'Rick Astley', isEditing: false },
    // Otros mensajes pueden estar aquí
  ];

  constructor(
    private route: ActivatedRoute,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    const contactId = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido para contactar: ', contactId);
  }

  async goToSendMessage(): Promise<void> {
    console.log('Enviando mensaje a prospecto: ', this.selectedMessage);
    await this.presentToast('Se ha enviado el mensaje correctamente');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000,
      position: 'bottom', // 'top', 'middle', 'bottom'
      color: 'success',
    });
    toast.present();
  }

  addMessage() {
    if (this.newMessageText.trim()) {
      this.customMessages.push({
        text: this.newMessageText.trim(),
        originalText: this.newMessageText,
        isEditing: false,
      });
      this.newMessageText = '';
      this.isAddingNewMessage = false;
      this.saveMessagesToLocalStorage();
    }
  }

  enableAddMessage() {
    this.isAddingNewMessage = true;
  }

  async toggleEditInput(index: number, slidingItem: any) {
    await slidingItem.close();
    if (!this.customMessages[index].isEditing) {
      // Guarda el valor original antes de comenzar la edición
      this.customMessages[index].originalText = this.customMessages[index].text;
    }
    this.customMessages[index].isEditing = !this.customMessages[index].isEditing;
  }

  seleccionarMensaje(message: string): void {
    this.selectedMessage = message;
  }

  async confirmDeleteMessage(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar este mensaje?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.customMessages.splice(index, 1);
          },
        },
      ],
    });

    await alert.present();
  }

  saveMessagesToLocalStorage() {
    localStorage.setItem('customMessages', JSON.stringify(this.customMessages));
  }

  async confirmEditMessage(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Edición',
      message: '¿Estás seguro de que deseas editar este mensaje?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.customMessages[index].isEditing = false;
            this.saveMessagesToLocalStorage();
          },
        },
      ],
    });

    await alert.present();
  }

  cancelEditMessage(index: number) {
    // Restaura el valor original al cancelar la edición
    this.customMessages[index].text = this.customMessages[index].originalText;
    this.customMessages[index].isEditing = false;
  }

  cancelAddMessage(): void {
    this.newMessageText = ''; // Limpia el texto del input
    this.isAddingNewMessage = false; // Oculta el input y los botones
  }
}
