import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HotelModelService } from 'src/services/hotel-model.service';

@Injectable({
  providedIn: 'root'
})

//this is auth gaurd
export class IsSignedInGuard implements CanActivate {

  
  constructor(private authService: HotelModelService, private router: Router) {
    alert("IsSignedInGuard ");
    console.log("IsSignedInGuard is intialzied");
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    debugger;
    const isLoggedIn = this.authService.is_signedin();

  if (isLoggedIn) {
    console.log("User is signed in. Allowing access.");
    return true; // Allow access to the route
  } else {
    console.log("User is not signed in. Redirecting to login.");
    this.router.navigate(['']); // Redirect to the login page
    return false; // Prevent access
  }

  }
  
}
