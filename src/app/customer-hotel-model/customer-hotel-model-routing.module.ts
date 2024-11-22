import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerIndexGetallComponent } from './customer-index-getall/customer-index-getall.component';

const routes: Routes = [
  {path:'',component:CustomerIndexGetallComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerHotelModelRoutingModule { }
