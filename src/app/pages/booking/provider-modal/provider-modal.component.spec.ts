import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderModalComponent } from './provider-modal.component';

describe('ProviderModalComponent', () => {
  let component: ProviderModalComponent;
  let fixture: ComponentFixture<ProviderModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
