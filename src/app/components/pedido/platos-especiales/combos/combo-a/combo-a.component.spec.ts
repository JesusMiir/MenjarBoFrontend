import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboAComponent } from './combo-a.component';

describe('ComboAComponent', () => {
  let component: ComboAComponent;
  let fixture: ComponentFixture<ComboAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
