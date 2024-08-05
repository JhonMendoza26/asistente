import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactarProspectoComponent } from './contactar-prospecto.component';

describe('ContactarProspectoComponent', () => {
  let component: ContactarProspectoComponent;
  let fixture: ComponentFixture<ContactarProspectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactarProspectoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactarProspectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
