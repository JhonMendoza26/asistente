import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '@app/interface/contact';
import { Step } from '@app/interface/step';

@Component({
  selector: 'app-prospectos-seguimiento',
  templateUrl: './prospectos-seguimiento.component.html',
  styleUrls: ['./prospectos-seguimiento.component.scss']
})
export class ProspectosSeguimientoComponent implements OnInit {

  contact: Contact = { id: '', name: '', photo: '', phone: '', email: '', status: '1' };

  steps: Step[] = [
    { id: 1, name: 'Etapa 1', title: 'Título de Etapa 1', buttonText: 'Acción de Etapa 1' },
    { id: 2, name: 'Etapa 2', title: 'Título de Etapa 2', buttonText: 'Acción de Etapa 2' },
    { id: 3, name: 'Etapa 3', title: 'Título de Etapa 3', buttonText: 'Acción de Etapa 3' },
    { id: 4, name: 'Etapa 4', title: 'Título de Etapa 4', buttonText: 'Acción de Etapa 4' },
    { id: 5, name: 'Etapa 5', title: 'Título de Etapa 5', buttonText: 'Acción de Etapa 5' },
    { id: 6, name: 'Etapa 6', title: 'Título de Etapa 6', buttonText: 'Acción de Etapa 6' }
  ];

  currentStep: Step = this.steps[0];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      const contacts: Contact[] = JSON.parse(localStorage.getItem('contacts') || '[]');
      this.contact = contacts.find(contact => contact.id === contactId) || this.contact;
      this.updateCurrentStep();
    }
  }

  updateCurrentStep() {
    const currentStepId = parseInt(this.contact.status || '1', 10) || 1; // Convert status to step ID, default to 1
    this.currentStep = this.steps.find(step => step.id === currentStepId) || this.steps[0];
  }

  handleButtonClick() {
    console.log('Botón clicado');
    // Aquí puedes agregar la lógica que necesites al hacer clic en el botón
  }

}
