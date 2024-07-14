import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '@app/interface/contact';
import { StatusTask } from '@app/interface/status-task';
import { Task } from '@app/interface/task';

@Component({
  selector: 'app-prospectos-seguimiento',
  templateUrl: './prospectos-seguimiento.component.html',
  styleUrls: ['./prospectos-seguimiento.component.scss']
})
export class ProspectosSeguimientoComponent implements OnInit {

  contact: Contact = { id: '', name: '', photo: '', phone: '', email: '', status: 0 };

  taskUser: StatusTask = {
    firstStatusTask: 0,
    firstNameTask: '',
    firstValueBarTaks: '',
    firstPercentageTask: '',
    nextStatusTask: 0,
    nextNameTask: ''
  };

  contacts: Contact[] = [];
  tasks: Task[] = [];

  taskCounter: number = 0;
  taskCounterCompleted: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    //Obtener tareas
    this.getTask();

    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      this.contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      if(this.contacts){
        this.contact = this.contacts.find(contact => contact.id === contactId) || this.contact;
        this.getStatusProspecto(this.contact.status || 0);
      } else {
        console.log("No se encontro al usuario, intentalo de nuevo");
      }
    }
  }


  handleButtonClick(status: number):void {
    console.log("Task Counter: " + this.taskCounterCompleted);
    this.getStatusProspecto(status);
  }

  getStatusProspecto(status:number):void {
    //Obtener tareas
    this.taskCounter = this.tasks.length;
    //Buscar tarea de acuerdo al estatus del usuario
    const responseTask = this.tasks.find(task => task.statusTask === status);
    //Validamos si encontro la tarea, sino mostramos mensaje de error
    if(responseTask) {
      //Valores de la primer tarea
      this.taskUser.firstNameTask = responseTask.nameTask;
      this.taskUser.firstValueBarTaks = responseTask.valueTask || '0.15';
      this.taskUser.firstPercentageTask = responseTask.percentageTask || '15';

      //valores de la siguiente tarea
      const responseNextTask = this.tasks.find(task => task.statusTask === status + 1);
      if(responseNextTask){
        this.taskUser.nextNameTask = responseNextTask.nameTask;
        this.taskUser.nextStatusTask = status + 1;
        this.taskCounterCompleted += 1;
      }else {
        console.log("Ocurrio un error al obtener la siguiente tarea");
      }
    } else {
      console.log("No se encontraron datos para el usuario");
    }
  }

  getTask():void {
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    if(!this.tasks){
      console.log("Ocurrio un error al obtener las tareas");
    }
  }

}
