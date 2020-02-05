import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CantidadPlatosComponent } from './cantidad-platos.component';

describe('CantidadPlatosComponent', () => {
  let component: CantidadPlatosComponent;
  let fixture: ComponentFixture<CantidadPlatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantidadPlatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantidadPlatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
