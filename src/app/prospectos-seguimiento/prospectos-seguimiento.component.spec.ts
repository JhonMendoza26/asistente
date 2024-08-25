import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectosSeguimientoComponent } from './prospectos-seguimiento.component';

describe('ProspectosSeguimientoComponent', () => {
  let component: ProspectosSeguimientoComponent;
  let fixture: ComponentFixture<ProspectosSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProspectosSeguimientoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProspectosSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
