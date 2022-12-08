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
import { CompteComponent } from './pages/compte/compte.component';
import { Intro2Component } from './pages/intro2/intro2.component';
import { Intro3Component } from './pages/intro3/intro3.component';
import { Intro1Component } from './pages/intro1/intro1.component';



@NgModule({
  declarations: [
    AppComponent,
    CompteComponent,
    Intro2Component,
    Intro3Component,
    Intro1Component,

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
