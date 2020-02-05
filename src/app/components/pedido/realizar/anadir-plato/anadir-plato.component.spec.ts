import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirPlatoComponent } from './anadir-plato.component';

describe('AnadirPlatoComponent', () => {
  let component: AnadirPlatoComponent;
  let fixture: ComponentFixture<AnadirPlatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnadirPlatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnadirPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
