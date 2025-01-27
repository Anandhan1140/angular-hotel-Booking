import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent }  from './app-Index/index/index.component';
import { RegisterComponent } from './app-Index/register/register.component';
import { LoginComponent } from './app-Index/login/login.component';
import { IsSignedInGuard } from 'src/guards/is-signed-in.guard';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'admin-hotel-model', loadChildren: () => import('./admin-hotel-model/admin-hotel-model.module').then(m => m.AdminHotelModelModule) }, // Lazy load the AdminHotelModel module
  {path: 'customer-hotel-model', loadChildren: () => import('./customer-hotel-model/customer-hotel-model.module').then(m=>m.CustomerHotelModelModule)},
  { path: 'register', component: RegisterComponent },
  {path:'login',component:LoginComponent},
  {path:'', // The route you want to protect
  component: IndexComponent,
  canActivate: [IsSignedInGuard]},


]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
