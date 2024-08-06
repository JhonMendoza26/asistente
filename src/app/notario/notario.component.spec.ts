import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotarioComponent } from './notario.component';

describe('NotarioComponent', () => {
  let component: NotarioComponent;
  let fixture: ComponentFixture<NotarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
