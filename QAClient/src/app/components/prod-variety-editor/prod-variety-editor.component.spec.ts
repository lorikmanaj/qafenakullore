import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdVarietyEditorComponent } from './prod-variety-editor.component';

describe('ProdVarietyEditorComponent', () => {
  let component: ProdVarietyEditorComponent;
  let fixture: ComponentFixture<ProdVarietyEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdVarietyEditorComponent]
    });
    fixture = TestBed.createComponent(ProdVarietyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
