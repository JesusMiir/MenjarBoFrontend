import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionEncargoComponent } from './informacion-encargo.component';

describe('InformacionEncargoComponent', () => {
  let component: InformacionEncargoComponent;
  let fixture: ComponentFixture<InformacionEncargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionEncargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionEncargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
