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



@NgModule({
  declarations: [
    LayoutNomenuComponent,
    LoginComponent,
    RegisterComponent,
    TosComponent,
    ResetpwdComponent,
    InfosComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LayoutNomenuModule { }
