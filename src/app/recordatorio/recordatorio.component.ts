import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recordatorio',
  templateUrl: './recordatorio.component.html',
  styleUrls: ['./recordatorio.component.scss'],
})
export class RecordatorioComponent implements OnInit {
  selectedDate: string = '';
  public name: string = '';

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {}

  dismiss() {
    this.modalController.dismiss();
  }

  confirm() {
    this.modalController.dismiss({
      selectedDate: new Date(this.selectedDate),
    });
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }
}
