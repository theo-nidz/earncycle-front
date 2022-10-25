import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { IndexComponent } from './index/index.component';
import {CouponComponent} from "./coupon/coupon.component";
import {CouponDetailsComponent} from "./coupon-details/coupon-details.component";

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'coupon', component: CouponComponent },
  { path: 'coupon/details', component: CouponDetailsComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
