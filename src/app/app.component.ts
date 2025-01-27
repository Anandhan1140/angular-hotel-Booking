import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotelModelService } from 'src/services/hotel-model.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hotel_project_angular';
  is_signedin :boolean = false;
  user_details :any =null;
  isAdmin: boolean = false; // Property to store if the user is an admin
  

  constructor(private authService: HotelModelService,private router: Router,) {}

  ngOnInit(): void {  
    console.log('AppComponent initialized');
    this.subscribe_BehaviorSubject();   
   // this.checkUserRole();
  
  }

  subscribe_BehaviorSubject(){
    debugger;
        // Subscribe to the login state and user details from the hotel service
    this.authService.is_signedin$.subscribe((isSignedIn) => {
      this.is_signedin = isSignedIn;
    });

    this.authService.user_details$.subscribe((userDetails) => {
      this.user_details = userDetails;
    });
  }


//   checkUserRole() {
//     debugger;
//     const userRole = localStorage.getItem('userRole');
//     this.isAdmin = userRole === 'Admin'; // Set isAdmin based on stored role

// }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

}

