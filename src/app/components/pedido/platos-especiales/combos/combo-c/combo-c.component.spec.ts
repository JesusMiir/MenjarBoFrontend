import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboCComponent } from './combo-c.component';

describe('ComboCComponent', () => {
  let component: ComboCComponent;
  let fixture: ComponentFixture<ComboCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
