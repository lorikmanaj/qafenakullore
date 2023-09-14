import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainsectionComponent } from './mainsection.component';

describe('MainsectionComponent', () => {
  let component: MainsectionComponent;
  let fixture: ComponentFixture<MainsectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainsectionComponent]
    });
    fixture = TestBed.createComponent(MainsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
