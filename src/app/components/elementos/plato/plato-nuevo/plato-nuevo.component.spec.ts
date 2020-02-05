import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoNuevoComponent } from './plato-nuevo.component';

describe('PlatoNuevoComponent', () => {
  let component: PlatoNuevoComponent;
  let fixture: ComponentFixture<PlatoNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatoNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
