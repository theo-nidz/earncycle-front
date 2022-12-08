import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HeaderLogComponent } from '../component/header-log/header-log.component';
import { VoucherBoxComponent } from '../component/voucher-box/voucher-box.component';


@NgModule({
  declarations: [
    HeaderLogComponent,
    VoucherBoxComponent,
  ],
  imports: [
    CommonModule,
    LeafletModule,
  ],
  exports:[
    HeaderLogComponent,
    VoucherBoxComponent,
  ]
})
export class SharedModule { }
