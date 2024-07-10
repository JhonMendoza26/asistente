import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    //
  }

  modules = [
    { text: 'Publicaciones', icon: 'newspaper', path: '/publicaciones' },
    { text: 'Prospectos', icon: 'people', path: '/prospectos' },
    { text: 'Recorridos', icon: 'walk', path: '/recorridos' },
    { text: 'Seguimiento', icon: 'clipboard', path: '/seguimiento' },
    { text: 'Oferta', icon: 'pricetag', path: '/oferta' },
    { text: 'Contratos', icon: 'document', path: '/contratos' },
    { text: 'Anticipo', icon: 'cash', path: '/anticipo' },
    { text: 'Firma Notario', icon: 'person', path: '/firma-notario' }
  ];

  navigateTo(path: string) {
    console.log("Presionando: " + path);
    this.navCtrl.navigateForward(path);
  }

}
