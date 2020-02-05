import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaInformacionComponent } from './categoria-informacion.component';

describe('CategoriaInformacionComponent', () => {
  let component: CategoriaInformacionComponent;
  let fixture: ComponentFixture<CategoriaInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
