import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Task } from '@app/interface/task';

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

  generateTaskByDefault(): Task[] {
    return [
      { nameTask: 'Primer paso', statusTask: 0, percentageTask: '0', valueTask: '0'},
      { nameTask: 'Recorrido inicial', statusTask: 1, percentageTask: '15', valueTask: '0.15'},
      { nameTask: 'Seguimiento', statusTask: 2, percentageTask: '30', valueTask: '0.3'},
      { nameTask: 'Oferta', statusTask: 3, percentageTask: '45', valueTask: '0.45'},
      { nameTask: 'Firma de contrato', statusTask: 4, percentageTask: '60', valueTask: '0.6'},
      { nameTask: 'Anticipo', statusTask: 5, percentageTask: '75', valueTask: '0.75'},
      { nameTask: 'Firma ante notario (Venta)', statusTask: 6, percentageTask: '90', valueTask: '0.9'},
      { nameTask: 'Entrega de llaves (Renta)', statusTask: 7, percentageTask: '90', valueTask: '0.9'},
      { nameTask: 'Finalizar seguimiento', statusTask: 8, percentageTask: '100', valueTask: '1'},
    ];
  }

  saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.task));
  }

}
