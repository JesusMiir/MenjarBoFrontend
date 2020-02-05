import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredienteTodosComponent } from './ingrediente-todos.component';

describe('IngredienteTodosComponent', () => {
  let component: IngredienteTodosComponent;
  let fixture: ComponentFixture<IngredienteTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredienteTodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredienteTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
