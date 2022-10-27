
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutMenuModule } from './layouts/layout-menu/layout-menu.module';
import { LayoutNomenuModule } from './layouts/layout-nomenu/layout-nomenu.module';
import {CouponComponent} from "./shared/components/coupon/coupon.component";
import {CouponDetailsComponent} from "./shared/components/coupon-details/coupon-details.component";
import {InfosComponent} from "./shared/components/infos/infos.component";


@NgModule({
  declarations: [
    AppComponent,
    CouponComponent,
    CouponDetailsComponent,
    InfosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutMenuModule,
    LayoutNomenuModule,
    LeafletModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
