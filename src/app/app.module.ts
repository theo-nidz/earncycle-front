import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { AppRoutingModule } from './pages/app-routing.module';
import { AppComponent } from './app.component';
import { LayoutMenuModule } from './layouts/layout-menu/layout-menu.module';
import { LayoutNomenuModule } from './layouts/layout-nomenu/layout-nomenu.module';
import { authInterceptorProviders } from './_helper/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutMenuModule,
    LayoutNomenuModule,
    LeafletModule,
    LeafletMarkerClusterModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
