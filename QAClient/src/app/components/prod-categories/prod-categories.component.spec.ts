import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdCategoriesComponent } from './prod-categories.component';

describe('ProdCategoriesComponent', () => {
  let component: ProdCategoriesComponent;
  let fixture: ComponentFixture<ProdCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdCategoriesComponent]
    });
    fixture = TestBed.createComponent(ProdCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
