import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderHandlerComponent } from './slider-handler.component';

describe('SliderHandlerComponent', () => {
  let component: SliderHandlerComponent;
  let fixture: ComponentFixture<SliderHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderHandlerComponent]
    });
    fixture = TestBed.createComponent(SliderHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
