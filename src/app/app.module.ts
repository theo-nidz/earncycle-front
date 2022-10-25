import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { CouponComponent } from './coupon/coupon.component';
import { CouponDetailsComponent } from './coupon-details/coupon-details.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CouponComponent,
    CouponDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
