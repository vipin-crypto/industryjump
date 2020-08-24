import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentProviderComponent } from './document-provider.component';

describe('DocumentProviderComponent', () => {
  let component: DocumentProviderComponent;
  let fixture: ComponentFixture<DocumentProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
