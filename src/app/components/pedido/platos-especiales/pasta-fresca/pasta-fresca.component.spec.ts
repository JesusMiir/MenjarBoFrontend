import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastaFrescaComponent } from './pasta-fresca.component';

describe('PastaFrescaComponent', () => {
  let component: PastaFrescaComponent;
  let fixture: ComponentFixture<PastaFrescaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastaFrescaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastaFrescaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
