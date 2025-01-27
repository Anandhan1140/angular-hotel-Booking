import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class HotelModelService  {
 

  private myApp_Url ='https://localhost:7290/api/Auth';
  private Admin_Url = 'https://localhost:7290/api/Admin'
  apiUrl: any;

  private isSignedInSubject = new BehaviorSubject<boolean>(false); // Tracks login state
  private userDetailsSubject = new BehaviorSubject<any>(null); // Tracks user details

  is_signedin$ = this.isSignedInSubject.asObservable(); // Expose as observable bcoz of observale we can subscibr at any place;
  user_details$ = this.userDetailsSubject.asObservable(); // Expose as observable


  constructor( private _http:HttpClient, private cookieService: CookieService,private router: Router) { }

/*method to register*/
  register_user(model: any): Observable<any> {
    debugger;
    return this._http.post(`${this.myApp_Url}/Register`, model);
  }


  /* Method to log in the user*/ 
  login_User(credentials: { email: string; password: string }): Observable<any> {
    debugger;
    return this._http.post(`${this.myApp_Url}/login`, credentials).pipe(
      tap((res: any) => {
       //// Store the entire API response in local storage
       localStorage.setItem('UserDetails',JSON.stringify(res))
        // Save access token in local storage
        localStorage.setItem('jwtToken', res.message);
        // Save refresh token in cookies
        this.cookieService.set('refreshToken', res.refreshToken);
      }),
      catchError(err => {
        console.error('Login failed:', err);
        return throwError(err);
      })
    );
  }


/*method to refresh token */
refreshToken(): Observable<any> {
  debugger
  const refreshToken = this.cookieService.get('refreshToken');

  if (!refreshToken) {
    console.error('No refresh token found');
    return throwError('No refresh token found');
  }

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    body: { refreshToken }
  };
  // return this._http.post(`${this.myApp_Url}/refresh-token`, {refreshToken}, httpOptions)

  return this._http.post(`${this.myApp_Url}/refresh-token`, {refreshToken}, httpOptions).pipe(
    tap((res: any) => {
      debugger;
        // Log the generation time of the new refresh token
        console.log(`New Refresh Token generated for User ID at: ${new Date().toISOString()}`);
      // Save new tokens
      localStorage.setItem('jwtToken', res.message);
      this.cookieService.set('refreshToken', res.refreshToken);
   
    }),
    catchError(err => {
      console.error('Error refreshing token:', err);
      return throwError(err);
    })
  );
}



  // Update the login state and user details
  setLoginState(isSignedIn: boolean, userDetails: any) {
    debugger;
    this.isSignedInSubject.next(isSignedIn);
    this.userDetailsSubject.next(userDetails);
  }

  /*Logout logic: Clear user data and update state*/
  logout() {
    debugger;
    localStorage.clear(); // Clear localStorage
    this.isSignedInSubject.next(false); // Update login state
    this.userDetailsSubject.next(null); // Clear user details
      // Navigate to the desired URL (e.g., '/login') and clear navigation history
  this.router.navigate(['/login']).then(() => {
    debugger;
    // Replace current history state to prevent back navigation
    window.history.pushState(null, '', window.location.href);

    // Disable the back button by blocking the popstate event
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href); // Push the current state again
    };
  });
  }

  /*Accessor methods for synchronous use it is called in can activate for check for userlogin or not*/
  is_signedin() {
    return this.isSignedInSubject.getValue();
  }

  get_user_detail() {
    return this.userDetailsSubject.getValue();
  }




 /* Method to create a hotel*/
 create_Hotel(formData: FormData): Observable<any> {
  debugger;
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    console.error('No token found. User might not be logged in.');
    return throwError('No token found');
  }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  return this._http.post(`${this.Admin_Url}/create_hotel`, formData, { headers })
}




}
