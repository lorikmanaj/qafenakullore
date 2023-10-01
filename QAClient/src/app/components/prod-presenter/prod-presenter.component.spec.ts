import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdPresenterComponent } from './prod-presenter.component';

describe('ProdPresenterComponent', () => {
  let component: ProdPresenterComponent;
  let fixture: ComponentFixture<ProdPresenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdPresenterComponent]
    });
    fixture = TestBed.createComponent(ProdPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
