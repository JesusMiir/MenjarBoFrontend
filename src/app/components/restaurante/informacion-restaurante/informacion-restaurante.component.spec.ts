import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionRestauranteComponent } from './informacion-restaurante.component';

describe('InformacionRestauranteComponent', () => {
  let component: InformacionRestauranteComponent;
  let fixture: ComponentFixture<InformacionRestauranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionRestauranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
