import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboBComponent } from './combo-b.component';

describe('ComboBComponent', () => {
  let component: ComboBComponent;
  let fixture: ComponentFixture<ComboBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
