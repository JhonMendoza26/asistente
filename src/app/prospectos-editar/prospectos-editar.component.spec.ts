import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectosEditarComponent } from './prospectos-editar.component';

describe('ProspectosEditarComponent', () => {
  let component: ProspectosEditarComponent;
  let fixture: ComponentFixture<ProspectosEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectosEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProspectosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
