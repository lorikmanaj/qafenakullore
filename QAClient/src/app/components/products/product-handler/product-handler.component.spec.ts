import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHandlerComponent } from './product-handler.component';

describe('ProductHandlerComponent', () => {
  let component: ProductHandlerComponent;
  let fixture: ComponentFixture<ProductHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductHandlerComponent]
    });
    fixture = TestBed.createComponent(ProductHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
