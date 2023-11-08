import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoProductComponent } from './promo-product.component';

describe('PromoProductComponent', () => {
  let component: PromoProductComponent;
  let fixture: ComponentFixture<PromoProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromoProductComponent]
    });
    fixture = TestBed.createComponent(PromoProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
