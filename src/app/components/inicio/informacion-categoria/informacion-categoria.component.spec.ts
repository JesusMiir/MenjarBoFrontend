import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionCategoriaComponent } from './informacion-categoria.component';

describe('InformacionCategoriaComponent', () => {
  let component: InformacionCategoriaComponent;
  let fixture: ComponentFixture<InformacionCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
