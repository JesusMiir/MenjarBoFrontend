import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRestauranteComponent } from './register-restaurante.component';

describe('RegisterRestauranteComponent', () => {
  let component: RegisterRestauranteComponent;
  let fixture: ComponentFixture<RegisterRestauranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRestauranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
