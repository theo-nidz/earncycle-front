
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutMenuModule } from './layouts/layout-menu/layout-menu.module';
import { LayoutNomenuModule } from './layouts/layout-nomenu/layout-nomenu.module';
import { TosComponent } from './pages/tos/tos.component';
import { InfosComponent } from './shared/components/infos/infos.component';




@NgModule({
  declarations: [AppComponent, InfosComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutMenuModule,
    LayoutNomenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
