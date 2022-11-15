import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutMenuModule } from './layouts/layout-menu/layout-menu.module';
import { LayoutNomenuModule } from './layouts/layout-nomenu/layout-nomenu.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutMenuModule,
    LayoutNomenuModule,
    LeafletModule,
    HttpClientModule,
    LeafletMarkerClusterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
