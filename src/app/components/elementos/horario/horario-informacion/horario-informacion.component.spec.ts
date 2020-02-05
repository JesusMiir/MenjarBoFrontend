import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioInformacionComponent } from './horario-informacion.component';

describe('HorarioInformacionComponent', () => {
  let component: HorarioInformacionComponent;
  let fixture: ComponentFixture<HorarioInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
