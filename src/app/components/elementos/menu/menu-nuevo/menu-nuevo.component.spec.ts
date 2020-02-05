import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNuevoComponent } from './menu-nuevo.component';

describe('MenuNuevoComponent', () => {
  let component: MenuNuevoComponent;
  let fixture: ComponentFixture<MenuNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
