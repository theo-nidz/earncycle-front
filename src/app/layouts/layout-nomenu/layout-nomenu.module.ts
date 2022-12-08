import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutNomenuComponent } from './layout-nomenu.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { TosComponent } from 'src/app/pages/tos/tos.component';
import { ResetpwdComponent } from 'src/app/pages/resetpwd/resetpwd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfosComponent } from 'src/app/pages/infos/infos.component';
import { IntroComponent } from 'src/app/pages/intro/intro.component';
import { CouponDetailsComponent } from 'src/app/pages/coupon-details/coupon-details.component';



@NgModule({
  declarations: [
    LayoutNomenuComponent,
    LoginComponent,
    RegisterComponent,
    TosComponent,
    ResetpwdComponent,
    InfosComponent,
    IntroComponent,
    CouponDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    SharedModule,
  ]
})
export class LayoutNomenuModule { }
