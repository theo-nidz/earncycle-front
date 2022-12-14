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
import { CouponComponent } from 'src/app/pages/coupon/coupon.component';
import { VoucherListComponent } from 'src/app/pages/voucher-list/voucher-list.component';
import { CompteComponent } from 'src/app/pages/compte/compte.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    LayoutMenuComponent,
    IndexComponent,
    ProfileComponent,
    ErrorComponent,
    CouponComponent,
    VoucherListComponent,
    CompteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    LeafletModule,
    LeafletMarkerClusterModule,
    FormsModule
  ],
  exports:[
    SharedModule,
  ]
})
export class LayoutMenuModule { }
