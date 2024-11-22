import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerIndexGetallComponent } from './customer-index-getall.component';

describe('CustomerIndexGetallComponent', () => {
  let component: CustomerIndexGetallComponent;
  let fixture: ComponentFixture<CustomerIndexGetallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerIndexGetallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerIndexGetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
