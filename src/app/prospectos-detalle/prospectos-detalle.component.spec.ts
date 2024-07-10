import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectosDetalleComponent } from './prospectos-detalle.component';

describe('ProspectosDetalleComponent', () => {
  let component: ProspectosDetalleComponent;
  let fixture: ComponentFixture<ProspectosDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectosDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProspectosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
