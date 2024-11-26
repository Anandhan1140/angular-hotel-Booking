import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { DropdownService } from 'src/services/dropdown.service';
import { HotelModelService } from 'src/services/hotel-model.service';


@Component({
  selector: 'app-admin-create-edit',
  templateUrl: './admin-create-edit.component.html',
  styleUrls: ['./admin-create-edit.component.css']
})
export class AdminCreateEditComponent implements OnInit {

  country_dropdown_List : {countryId:number,countryName:string}[] = [];
  state_dropdown_list : {stateId:number,stateName:string ,countryId:number}[] = [];
  district_dropdownlist : {districtId:number ,districtName:string,stateId:number}[] = [];
  hotel_facility_list :{hotelFacility_Id:number ,hotelFacilityName:string}[]=[];

  load_state_by_selected_country : {stateId:number; stateName:string;countryId:number}[]=[];
  load_District_by_selected_state :{districtId:number;districtName:string;stateId:number}[]=[];


  admin_Create_hotel : FormGroup;

  constructor(private fb :FormBuilder , private _router:Router,private hotelService: HotelModelService, private dropdownService: DropdownService ) { 
    this.admin_Create_hotel  = this.fb.group({
      HotelName : ['',[Validators.required,]],
      PhoneNo :['',[Validators.required]],
      Email : ['',[Validators.required, Validators.email]],
      CountryId : ['',[Validators.required]],
      StateId : ['',[Validators.required]],
      DistrictId : ['',[Validators.required]],
      location : ['',[Validators.required]],
      HotelFacilities : ['',Validators.required],
      formFile  :[null,[Validators.required]],
    })
  }

  ngOnInit(): void {
    this.loadCountries();
    this.load_states();
    this.load_district();
    this. load_hotel_facility();
  }

  loadCountries() {
    this.dropdownService.getCountryList().subscribe(
      (data) => {
        this.country_dropdown_List = data;
      },
      (error) => {
        console.error('Error loading countries:', error);
      }
    );
  }


  load_states() {
    this.dropdownService.getStateList().subscribe(
      (data)=>{
        this.state_dropdown_list = data;
      },
      (error)=>{
        console.error('Error loading states:', error);
      }
    )
  }


  load_district(){
    this.dropdownService.getDistrictList().subscribe(
      (data)=>{
        this.district_dropdownlist = data;
      },
      (error)=>{
        console.error('Error loading district:', error);
      }
    )
  }

  load_hotel_facility(){
    this.dropdownService.get_hotel_facility().subscribe(
      (data)=>{
        console.log("load_hotel_facility",data);
        this.hotel_facility_list =data;
      },
      (error)=>{
        console.error('Error loading district:', error);
      }

    )
  }

  onCountryChange() {
    const country_Id = this.admin_Create_hotel.get('CountryId')?.value;
    console.log('Selected country ID:', country_Id);  // Debugging line

    
    if (country_Id) {
      debugger;
      this.load_state_by_selected_country = this.state_dropdown_list.filter(state=>state.countryId == country_Id );
    } 
    else {
      // If "Select a country" is chosen, clear the states and reset the form
      this.load_state_by_selected_country = [];
      this.admin_Create_hotel.get('StateId')?.setValue('');
      this.admin_Create_hotel.get('DistrictId')?.setValue('');
    }
  
    // Clear selected cities if applicable
    this.load_District_by_selected_state = [];
  }
  

  onStateChange(){
    const selected_state_Id = this.admin_Create_hotel.get('StateId')?.value;
    console.log('Selected state ID',selected_state_Id);

    if(selected_state_Id){
      debugger;
      this.load_District_by_selected_state = this.district_dropdownlist.filter(district=>district.stateId == selected_state_Id);
    }
    else{
      this.load_District_by_selected_state = [];
      this.admin_Create_hotel.get('DistrictId')?.setValue('');
    }

    
  } 
  onFacilityChange(event: any) {
    const selectedFacilitiesString = this.admin_Create_hotel.get('HotelFacilities')?.value || '';
    const selectedFacilities = selectedFacilitiesString ? selectedFacilitiesString.split(',') : [];
    const facilityValue = event.target.value;
    console.log('facility_id:::', facilityValue);
  
    if (event.target.checked) {
      // Add facility if checked
      if (!selectedFacilities.includes(facilityValue)) {
        selectedFacilities.push(facilityValue);
      }
    } else {
      // Remove facility from the array if unchecked
      const index = selectedFacilities.indexOf(facilityValue);
      if (index >= 0) {
        selectedFacilities.splice(index, 1);
      }
    }
  
    // Convert the selected facilities array to a comma-separated string
    const selectedFacilityString = selectedFacilities.join(',');
  
    // Update the form control with the new string of facilities
    this.admin_Create_hotel.get('HotelFacilities')?.setValue(selectedFacilityString);
  }
  

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // You can perform further processing, e.g., upload the file or store it
      console.log('Selected file:', file);
      // Optional: You could set the file in the form control if you want to track it
      this.admin_Create_hotel.patchValue({
        formFile: file
      });
    }
  }
  

  onSubmit() {
    debugger;
    if (this.admin_Create_hotel.valid) {
      const formdata = new FormData();

      // Explicitly append each form field
      formdata.append('HotelName', this.admin_Create_hotel.get('HotelName')?.value);
      formdata.append('PhoneNo', this.admin_Create_hotel.get('PhoneNo')?.value);
      formdata.append('Email', this.admin_Create_hotel.get('Email')?.value);
      formdata.append('CountryId', this.admin_Create_hotel.get('CountryId')?.value);
      formdata.append('StateId', this.admin_Create_hotel.get('StateId')?.value);
      formdata.append('DistrictId', this.admin_Create_hotel.get('DistrictId')?.value);
      formdata.append('Location', this.admin_Create_hotel.get('location')?.value);
      formdata.append('HotelFacilities', this.admin_Create_hotel.get('HotelFacilities')?.value);

      // Handle the file input separately
      const fileInput = this.admin_Create_hotel.get('formFile')?.value;
      if (fileInput) {
          formdata.append('formFile', fileInput); // Bind the file correctly
      }
      // Display the key/value pairs
      for (var [key, value] of (formdata as any).entries()) { 
        console.log(key, value);
      }    
 

      this.hotelService.create_Hotel(formdata).subscribe(
        response => {
          console.log('Hotel created successfully:', response);
          this._router.navigate(['/admin-index']);
          // Optionally navigate or show a success message
        },
        error => {
          console.error('Error creating hotel:', error);
          
          // Handle error appropriately
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

}
