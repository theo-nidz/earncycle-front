import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { IntroComponent } from './components/intro/intro.component';


@NgModule({
  declarations: [

  
    IntroComponent
  ],
  imports: [
    CommonModule,
    LeafletModule
  ],
  exports:[

  ]
})
export class SharedModule { }
