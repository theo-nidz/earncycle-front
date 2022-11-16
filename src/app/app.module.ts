import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutMenuModule } from './layouts/layout-menu/layout-menu.module';
import { LayoutNomenuModule } from './layouts/layout-nomenu/layout-nomenu.module';
import {CouponComponent} from "./shared/components/coupon/coupon.component";
import {CouponDetailsComponent} from "./shared/components/coupon-details/coupon-details.component";
import {InfosComponent} from "./shared/components/infos/infos.component";
import { authInterceptorProviders } from './_helper/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
//import {IntroComponent} from "./shared/components/intro/intro.component";


@NgModule({
  declarations: [
    AppComponent,
    CouponComponent,
    CouponDetailsComponent,
    InfosComponent,
    //IntroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutMenuModule,
    LayoutNomenuModule,
    LeafletModule,
    HttpClientModule,
    LeafletMarkerClusterModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
