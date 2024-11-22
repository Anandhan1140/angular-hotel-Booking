import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLoginLayoutComponent } from './app-login-layout.component';

describe('AppLoginLayoutComponent', () => {
  let component: AppLoginLayoutComponent;
  let fixture: ComponentFixture<AppLoginLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLoginLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLoginLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
