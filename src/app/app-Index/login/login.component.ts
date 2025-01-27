import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotelModelService } from 'src/services/hotel-model.service';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';

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
    private _cookieService: CookieService,
    private location: Location // Inject Location service  
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    console.log('LoginComponent initialized');

  }

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
         // Store the JWT token and user in
         // formation in localStorage
         localStorage.setItem('is_signedin', 'true');
         localStorage.setItem('jwtToken', res.message);
         localStorage.setItem('userRole', res.userRole);
         localStorage.setItem('userName', res.userName);
         // Set refresh token in cookie with options
         this._cookieService.set('refreshToken', res.refreshToken, { path: '/', secure: true, sameSite: 'Strict' });

               // Update login state immediately
        this._hotelModelService.setLoginState(true, {
          name: res.userName,
          userRole: res.userRole
        });

          // Replace history state to avoid login page in the history
          this.location.replaceState('/');  // Replaces the current history state with the homepage (IndexComponent)

          
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