import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class HotelModelService {

  private myApp_Url ='https://localhost:7290/api/Auth';
  private Admin_Url = 'https://localhost:7290/api/Admin'
  apiUrl: any;


  constructor( private _http:HttpClient, private cookieService: CookieService) { }

//method to register
  register_user(model: any): Observable<any> {
    debugger;
    return this._http.post(`${this.myApp_Url}/Register`, model);
  }


  // Method to log in the user
  login_User(credentials: { email: string; password: string }): Observable<any> {
    debugger;
    return this._http.post(`${this.myApp_Url}/login`, credentials).pipe(
      tap((res: any) => {
        //console.log("token1",res.message)
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


 // Method to create a hotel
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


//method to refresh token 
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
      console.log('New Refresh Token generated:', res);
      debugger;
        // Log the generation time of the new refresh token
        console.log(`New Refresh Token generated for User ID at: ${new Date().toISOString()}`);
      // Save new tokens
      localStorage.setItem('jwtToken', res.message);
      this.cookieService.set('refreshToken', res.refreshToken);
      console.log("refreshToken",res.refreshToken)
    }),
    catchError(err => {
      console.error('Error refreshing token:', err);
      return throwError(err);
    })
  );
}



}
