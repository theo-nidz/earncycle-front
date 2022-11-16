import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutMenuComponent } from './layout-menu.component';
import { IndexComponent } from 'src/app/pages/index/index.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/pages/error/error.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';




@NgModule({
  declarations: [
    LayoutMenuComponent,
    IndexComponent,
    ProfileComponent,
    ErrorComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    LeafletModule,
    LeafletMarkerClusterModule
  ]
})
export class LayoutMenuModule { }
