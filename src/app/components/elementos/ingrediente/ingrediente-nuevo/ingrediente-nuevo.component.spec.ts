import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredienteNuevoComponent } from './ingrediente-nuevo.component';

describe('IngredienteNuevoComponent', () => {
  let component: IngredienteNuevoComponent;
  let fixture: ComponentFixture<IngredienteNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredienteNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredienteNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
