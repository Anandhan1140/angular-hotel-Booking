import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateEditComponent } from './admin-create-edit.component';

describe('AdminCreateEditComponent', () => {
  let component: AdminCreateEditComponent;
  let fixture: ComponentFixture<AdminCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
