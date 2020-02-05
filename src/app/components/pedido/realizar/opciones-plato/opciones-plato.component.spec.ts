import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesPlatoComponent } from './opciones-plato.component';

describe('OpcionesPlatoComponent', () => {
  let component: OpcionesPlatoComponent;
  let fixture: ComponentFixture<OpcionesPlatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesPlatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
