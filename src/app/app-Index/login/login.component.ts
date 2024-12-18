import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotelModelService } from 'src/services/hotel-model.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _hotelModelService : HotelModelService,
    private _cookieService: CookieService
     // Inject your AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }

    this._hotelModelService.login_User(this.loginForm.value).subscribe({
      next: (res) => {
        console.log("created time ", Date.now());
        console.log("Login successful:", res.message);
        if (res.is_Success) {
          debugger;
          localStorage.setItem('jwtToken', res.message);
          localStorage.setItem('userRole', res.userRole);

         // Set refresh token in cookie with options
         this._cookieService.set('refreshToken', res.refreshToken, { path: '/', secure: true, sameSite: 'Strict' });
          
         const redirectUrl = '/admin-hotel-model';
          this.router.navigate([redirectUrl]);
        }
      },
      error: (e) => {
        console.error("Login failed:", e);
        alert('Login failed. Please check your credentials.');
      }
    });
  }


}