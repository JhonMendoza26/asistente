import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contactar-prospecto',
  templateUrl: './contactar-prospecto.component.html',
  styleUrls: ['./contactar-prospecto.component.scss']
})
export class ContactarProspectoComponent implements OnInit {

  selectedMessage: string = '';

  constructor(private route: ActivatedRoute, private toastController: ToastController) { }

  ngOnInit(): void {
    const contactId = this.route.snapshot.paramMap.get('id');
    console.log("ID recibido para contactar: ", contactId);
  }

  async goToSendMessage(): Promise<void> {
    console.log("Enviando mensaje a prospecto: ", this.selectedMessage);
    await this.presentToast("Se ha enviado el mensaje correctamente");
  }

  selectMessage(message: string) {
    this.selectedMessage = message;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000,
      position: 'bottom', // 'top', 'middle', 'bottom'
      color: 'success'
    });
    toast.present();
  }

}
