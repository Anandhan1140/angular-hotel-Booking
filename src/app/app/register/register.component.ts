import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotelModelService } from 'src/services/hotel-model.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _hotelModelService : HotelModelService
  ) {
    // Initialize the form group in the constructor
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field with validators
      password: ['', [Validators.required, Validators.minLength(6)]], // Password field with validators
      confirm_Password: ['', Validators.required] // Confirm Password field
    }, { validator: this.passwordMatchValidator }); // Custom validator for matching passwords
  }

  ngOnInit(): void {}

  // Custom validator for matching passwords
  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirm_Password')?.value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }
    console.log(this.registerForm.value)

    this._hotelModelService.register_user(this.registerForm.value).subscribe({
      next: (res) => {
        console.log("Employee posted: number of rows affected", res);
        this.router.navigate(['/']);
    },
    error: (e) => console.log(e)
});
  }
}
