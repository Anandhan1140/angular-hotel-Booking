import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country, District, HotelFacility, State } from 'src/Models/dropdown';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private myAppUrl = 'https://localhost:7290/api/Dropdown';

  constructor(private _http:HttpClient){} 


getCountryList():Observable<Country[]>{
  debugger;

  // const token = localStorage.getItem('jwtToken')
  // const headers = new HttpHeaders({
  //   'Authorization': `Bearer ${token}`
  // });
  return this._http.get<Country[]>(this.myAppUrl+'/Get_all_countries');
}

getStateList():Observable<State[]>{
  
  return this._http.get<State[]>(this.myAppUrl+'/GetStateList');  
}

getDistrictList():Observable<District[]>{
  
  return this._http.get<District[]>(this.myAppUrl + '/GetDistrictList')
}


get_hotel_facility():Observable<HotelFacility[]>{
 
  return this._http.get<HotelFacility[]>(this.myAppUrl + '/Get_all_facility')
}

}

