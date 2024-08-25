import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordatorioComponent } from './recordatorio.component';

describe('RecordatorioComponent', () => {
  let component: RecordatorioComponent;
  let fixture: ComponentFixture<RecordatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordatorioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
