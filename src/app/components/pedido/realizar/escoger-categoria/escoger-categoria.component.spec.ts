import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscogerCategoriaComponent } from './escoger-categoria.component';

describe('EscogerCategoriaComponent', () => {
  let component: EscogerCategoriaComponent;
  let fixture: ComponentFixture<EscogerCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscogerCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscogerCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
