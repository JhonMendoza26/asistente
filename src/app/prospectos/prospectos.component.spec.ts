import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectosComponent } from './prospectos.component';

describe('ProspectosComponent', () => {
  let component: ProspectosComponent;
  let fixture: ComponentFixture<ProspectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProspectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
