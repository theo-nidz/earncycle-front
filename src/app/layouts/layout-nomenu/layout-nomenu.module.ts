import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutNomenuComponent } from './layout-nomenu.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LayoutNomenuComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class LayoutNomenuModule { }
