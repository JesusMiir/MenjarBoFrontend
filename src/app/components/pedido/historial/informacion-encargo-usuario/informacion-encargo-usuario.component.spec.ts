import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionEncargoUsuarioComponent } from './informacion-encargo-usuario.component';

describe('InformacionEncargoUsuarioComponent', () => {
  let component: InformacionEncargoUsuarioComponent;
  let fixture: ComponentFixture<InformacionEncargoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionEncargoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionEncargoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
