import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerHotelModelRoutingModule } from './customer-hotel-model-routing.module';
import { CustomerPostEditComponent } from './customer-post-edit/customer-post-edit.component';
import { CustomerIndexGetallComponent } from './customer-index-getall/customer-index-getall.component';


@NgModule({
  declarations: [
    CustomerPostEditComponent,
    CustomerIndexGetallComponent
  ],
  imports: [
    CommonModule,   
  ]

})
export class CustomerHotelModelModule { }
