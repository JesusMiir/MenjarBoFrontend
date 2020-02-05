import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosRestauranteComponent } from './pedidos-restaurante.component';

describe('PedidosRestauranteComponent', () => {
  let component: PedidosRestauranteComponent;
  let fixture: ComponentFixture<PedidosRestauranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosRestauranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
