import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoEsperaComponent } from './tiempo-espera.component';

describe('TiempoEsperaComponent', () => {
  let component: TiempoEsperaComponent;
  let fixture: ComponentFixture<TiempoEsperaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiempoEsperaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiempoEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
