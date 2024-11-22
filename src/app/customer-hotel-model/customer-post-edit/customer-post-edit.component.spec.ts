import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPostEditComponent } from './customer-post-edit.component';

describe('CustomerPostEditComponent', () => {
  let component: CustomerPostEditComponent;
  let fixture: ComponentFixture<CustomerPostEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPostEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPostEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
