import { LayoutNomenuModule } from './layouts/layout-nomenu/layout-nomenu.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutMenuModule } from './layouts/layout-menu/layout-menu.module';




@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutMenuModule,
    LayoutNomenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
