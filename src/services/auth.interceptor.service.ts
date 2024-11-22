import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { HotelModelService } from './hotel-model.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private _hotelModelService: HotelModelService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor called===============>');
    console.log('Intercepting request:', req);
    debugger;

    const token: string | null =  localStorage.getItem('jwtToken'); // Replace with your actual token retrieval logic

    // Set the Authorization header only if token is not null
    const clonedRequest = req.clone({
      headers: token ? req.headers.set('Authorization', `Bearer ${token}`) : req.headers
    });
    console.log("first token in auth intercepto r service",token)
    return next.handle(clonedRequest).pipe(
        catchError((error) => {
          debugger;
          console.log("enter into this handel401 after token expired ",error,clonedRequest)
          if (error instanceof HttpErrorResponse && error.status === 401) {                   
            return this.handle401Error(req, next);
          }
          return throwError(() => error);
        })
      );

  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {    
    debugger
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return this._hotelModelService.refreshToken().pipe(
        switchMap((refreshRes: any) => {
          this.isRefreshing = false;
          if (refreshRes && refreshRes.message) {
            localStorage.setItem('jwtToken', refreshRes.message);
            const newHeaders = request.headers.set('Authorization', `Bearer ${refreshRes.message}`);
            const clonedRequest = request.clone({ headers: newHeaders });
            return next.handle(clonedRequest);
          }
           // If refreshing fails, throw an error
          return throwError(() => new Error('Refresh token failed'));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          return throwError(() => error);
        })
      );
    }
    return next.handle(request);
  }
}


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
];
