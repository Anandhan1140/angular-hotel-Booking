import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminHotelModelRoutingModule } from './admin-hotel-model-routing.module';
import { AdminCreateEditComponent } from './admin-create-edit/admin-create-edit.component';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [  
      AdminIndexComponent,
      AdminCreateEditComponent
  ],
  imports: [
    CommonModule,
    AdminHotelModelRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  exports: [AdminCreateEditComponent] // Ensure it is exported
  
})
export class AdminHotelModelModule { } //import admin hotel module at any module  toaccess any component of that module
