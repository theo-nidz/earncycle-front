import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HeaderLogComponent } from '../component/header-log/header-log.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LeafletModule,
    HeaderLogComponent,
  ],
  exports:[

  ]
})
export class SharedModule { }
