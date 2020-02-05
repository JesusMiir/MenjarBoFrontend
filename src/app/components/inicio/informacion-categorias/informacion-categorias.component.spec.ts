import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionCategoriasComponent } from './informacion-categorias.component';

describe('InformacionCategoriasComponent', () => {
  let component: InformacionCategoriasComponent;
  let fixture: ComponentFixture<InformacionCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
