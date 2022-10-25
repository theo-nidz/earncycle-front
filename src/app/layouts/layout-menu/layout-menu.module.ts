import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutMenuComponent } from './layout-menu.component';
import { IndexComponent } from 'src/app/pages/index/index.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { VouchersComponent } from 'src/app/pages/vouchers/vouchers.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/pages/error/error.component';



@NgModule({
  declarations: [
    LayoutMenuComponent,
    IndexComponent,
    ProfileComponent,
    ErrorComponent,
    VouchersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class LayoutMenuModule { }
