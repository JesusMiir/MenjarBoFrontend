import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaSubirImagenComponent } from './categoria-subir-imagen.component';

describe('CategoriaSubirImagenComponent', () => {
  let component: CategoriaSubirImagenComponent;
  let fixture: ComponentFixture<CategoriaSubirImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaSubirImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaSubirImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
