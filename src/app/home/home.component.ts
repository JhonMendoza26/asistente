import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Task } from '@app/interface/task';
import { EtapasSeguimiento } from '@app/interface/etapas-seguimiento';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private navCtrl: NavController) {
    const storedTasks = localStorage.getItem('tasks');
    this.task = storedTasks ? JSON.parse(storedTasks) : this.generateTaskByDefault();
  }

  ngOnInit() {
    this.saveTasksToLocalStorage();
  }

  modules = [
    { text: 'Publicaciones', icon: 'newspaper', path: '/publicaciones', color: 'dark' },
    { text: 'Prospectos', icon: 'people', path: '/prospectos', color: 'medium' },
    { text: 'Recorridos', icon: 'walk', path: '/recorridos', color: 'tertiary' },
    { text: 'Seguimiento', icon: 'clipboard', path: '/seguimiento', color: 'danger' },
    { text: 'Oferta', icon: 'pricetag', path: '/oferta', color: 'warning' },
    { text: 'Contratos', icon: 'document', path: '/contratos', color: 'success' },
    { text: 'Anticipo', icon: 'cash', path: '/anticipo', color: 'secondary' },
    { text: 'Firma Notario', icon: 'person', path: '/firma-notario', color: 'primary' }
  ];

  task: Task[] = [];

  navigateTo(path: string) {
    console.log("Presionando: " + path);
    this.navCtrl.navigateForward(path);
  }

  generateTaskByDefault(): EtapasSeguimiento[] {
    /*return [
      { nameTask: 'Primer paso', statusTask: 0, percentageTask: 0, valueTask: '0'},
      { nameTask: 'Recorrido inicial', statusTask: 1, percentageTask: 15, valueTask: '0.15'},
      { nameTask: 'Seguimiento', statusTask: 2, percentageTask: 30, valueTask: '0.3'},
      { nameTask: 'Oferta', statusTask: 3, percentageTask: 45, valueTask: '0.45'},
      { nameTask: 'Firma de contrato', statusTask: 4, percentageTask: 60, valueTask: '0.6'},
      { nameTask: 'Anticipo', statusTask: 5, percentageTask: 75, valueTask: '0.75'},
      { nameTask: 'Firma ante notario (Venta)', statusTask: 6, percentageTask: 90, valueTask: '0.9'},
      { nameTask: 'Entrega de llaves (Renta)', statusTask: 7, percentageTask: 90, valueTask: '0.9'},
      { nameTask: 'Finalizar seguimiento', statusTask: 8, percentageTask: 100, valueTask: '1'},
    ];*/

    return [
      { idEtapa: -1, nombre: 'No disponible', valor: 0, porcentaje: 0 },
      { idEtapa: 0, nombre: 'No iniciado', valor: 0, porcentaje: 0 },
      { idEtapa: 1, nombre: 'Recorrido inicial', valor: 0.15, porcentaje: 15 },
      { idEtapa: 2, nombre: 'Seguimiento', valor: 0.3, porcentaje: 30 },
      { idEtapa: 3, nombre: 'Oferta', valor: 0.45, porcentaje: 45 },
      { idEtapa: 4, nombre: 'Firma de contrato', valor: 0.6, porcentaje: 60 },
      { idEtapa: 5, nombre: 'Anticipo', valor: 0.75, porcentaje: 75 },
      { idEtapa: 6, nombre: 'Firma ante notario (Venta)', valor: 0.9, porcentaje: 90 },
      { idEtapa: 7, nombre: 'Entrega de llaves (Renta)', valor: 0.9, porcentaje: 90 },
      { idEtapa: 8, nombre: 'Finalizar seguimiento', valor: 1, porcentaje: 100 },
      { idEtapa: 9, nombre: 'Completado', valor: 1, porcentaje: 100 }
    ];
  }

  saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.task));
  }

}
