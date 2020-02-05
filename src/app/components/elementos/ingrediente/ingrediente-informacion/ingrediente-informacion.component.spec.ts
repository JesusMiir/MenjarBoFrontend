import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredienteInformacionComponent } from './ingrediente-informacion.component';

describe('IngredienteInformacionComponent', () => {
  let component: IngredienteInformacionComponent;
  let fixture: ComponentFixture<IngredienteInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredienteInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredienteInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
