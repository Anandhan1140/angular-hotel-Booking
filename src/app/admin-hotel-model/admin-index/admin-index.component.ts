import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminCreateEditComponent } from '../admin-create-edit/admin-create-edit.component';


@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.css']
})
export class AdminIndexComponent implements OnInit {

  isAdmin: boolean = false; // Property to store if the user is an admin
  isUser : boolean 
  search_Form : FormGroup;
  cities: { id: number; name: string }[] = []; // Replace with your city model
  hotels :{id:number; name:string; cityId:number}[]=[]; // Example hotel model
  filterd_hotels :{id:number ; name:string}[] = [];// Array to hold filtered hotels

  showCreateForm: boolean = false; // Flag to control form visibility


  constructor(private fb:FormBuilder , private _router : Router) {
    this.search_Form = this.fb.group({
      search_City : ['']
    })
   }

  ngOnInit(): void {
      this.load_cities();
      this.load_hotels();     
      this.checkUserRole(); // Check user role on init
  }

  load_cities(){
     // Fetch cities from your service or hardcoded array
    this.cities = [
      { id: 1, name: 'New York' },
      { id: 2, name: 'London' },
      { id: 3, name: 'Tokyo' },
      // Add more cities as needed
    ];
  }
  load_hotels(){
    // Hardcoded hotels
    this.hotels = [
      { id: 1, name: 'Hotel A', cityId: 1 },
      { id: 2, name: 'Hotel B', cityId: 1 },
      { id: 3, name: 'Hotel C', cityId: 2 },
      { id: 4, name: 'Hotel D', cityId: 3 },
    ];
  }

  onSearch(): void {
    debugger;
    const selectedCity = this.search_Form.value.search_City;
    this.filterHotels_method(selectedCity);
  }

  filterHotels_method(cityId: number): void {
    debugger;
    this.filterd_hotels = this.hotels.filter(hotel => hotel.cityId == cityId).map(hotel=>({
      id:hotel.id,
      name:hotel.name
    }));
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }

  checkUserRole() {
    debugger;
    const userRole = localStorage.getItem('userRole');
    this.isAdmin = userRole === 'Admin'; // Set isAdmin based on stored role
    this.isUser = userRole == 'User';
}


}
