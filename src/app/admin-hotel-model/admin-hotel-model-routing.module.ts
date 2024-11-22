import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { AdminCreateEditComponent } from './admin-create-edit/admin-create-edit.component';


const routes: Routes = [
  {path:'',component:AdminIndexComponent },// Default route for the admin-hotel-model module
  {path:'admin-create-edit',component:AdminCreateEditComponent},
  {path:'admin-index',component:AdminIndexComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHotelModelRoutingModule { }
