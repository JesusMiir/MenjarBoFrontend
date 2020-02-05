import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoTodosComponent } from './plato-todos.component';

describe('PlatoTodosComponent', () => {
  let component: PlatoTodosComponent;
  let fixture: ComponentFixture<PlatoTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatoTodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatoTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
