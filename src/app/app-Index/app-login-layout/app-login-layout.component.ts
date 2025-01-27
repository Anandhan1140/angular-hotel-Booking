import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-login-layout',
  templateUrl: './app-login-layout.component.html',
  styleUrls: ['./app-login-layout.component.css']
})
export class AppLoginLayoutComponent implements OnInit {

  @Input() is_signedin: boolean = false; // This may not be necessary if using localStorage
  @Input() user_details: any = null;    // This may also be set via localStorage
  @Output() logoutEvent = new EventEmitter<void>(); // Emits an event on logout

  userName: string = ''; // To display the username
  is_Admin: boolean = false; // To determine if the user is an admin

  ngOnInit(): void {
    debugger;
    console.log("AppLoginLayoutComponent initialized");
    // Initialize username and admin status when the component loads
    this.checkLoginStatus(); // Check login state after component initialization
  }

  /**  * Checks the login status from localStorage and updates the component's state   */

  private checkLoginStatus(): void {
    debugger;
    const is_signedin = localStorage.getItem('is_signedin') === 'true';
    if (is_signedin) {
      this.is_signedin = true;
      this.userName = localStorage.getItem('userName')!;
      this.is_Admin = localStorage.getItem('userRole') === 'Admin';
    } else {
      this.is_signedin = false;
    }
  }

  /* Emits the logout event to the parent component */  
  logout(): void {
    this.is_signedin = false;
    this.user_details = null;
    console.log('Logging out...');
    // Clear localStorage on logout
    localStorage.removeItem('is_signedin');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('jwtToken'); // Remove token if stored

    // Emit logout event
    this.logoutEvent.emit();


  }

  openAdminModal() {
    // Admin modal logic here
  }

  closeAddAdminModal() {
    // Close admin modal logic here
  }
}
