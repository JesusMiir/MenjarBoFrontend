import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTodosComponent } from './menu-todos.component';

describe('MenuTodosComponent', () => {
  let component: MenuTodosComponent;
  let fixture: ComponentFixture<MenuTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
