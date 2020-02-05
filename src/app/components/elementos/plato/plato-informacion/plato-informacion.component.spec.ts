import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoInformacionComponent } from './plato-informacion.component';

describe('PlatoInformacionComponent', () => {
  let component: PlatoInformacionComponent;
  let fixture: ComponentFixture<PlatoInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatoInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatoInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
