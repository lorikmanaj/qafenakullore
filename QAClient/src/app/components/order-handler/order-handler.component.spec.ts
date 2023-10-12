import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHandlerComponent } from './order-handler.component';

describe('OrderHandlerComponent', () => {
  let component: OrderHandlerComponent;
  let fixture: ComponentFixture<OrderHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderHandlerComponent]
    });
    fixture = TestBed.createComponent(OrderHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
