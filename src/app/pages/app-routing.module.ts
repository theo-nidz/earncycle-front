
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { LayoutMenuComponent } from '../layouts/layout-menu/layout-menu.component';
import { LayoutNomenuComponent } from '../layouts/layout-nomenu/layout-nomenu.component';
import { ErrorComponent } from './error/error.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ResetpwdComponent } from './resetpwd/resetpwd.component';
import { TosComponent } from './tos/tos.component';

import { CouponDetailsComponent } from './coupon-details/coupon-details.component';
import { CouponComponent } from './coupon/coupon.component';
import { InfosComponent } from './infos/infos.component';
import { IntroComponent } from './intro/intro.component';



const routes: Routes = [
  //LAYOUT MENU ROUTES
  {
    path:'',
    component:LayoutMenuComponent,
       //METTRE ROUTE ICI
    children:[
      {
        path:'',
        component:IndexComponent
      },
      {
        path:'index',
        component:IndexComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },

      {
        path:'error',
        component:ErrorComponent
      },
      {
        path:'infos',
        component: InfosComponent
      },
      {
        path:'coupon',
        component: CouponComponent
      },

      // TODO create page 404
      // {path: '**', component: Page404},

    ]
  },

  //LAYOUT NO MENU ROUTES
  {
    path:'',
    component:LayoutNomenuComponent,
    //METTRE ROUTE ICI
    children:[
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'register',
        component:RegisterComponent
      },
      {
        path:'tos',
        component:TosComponent
      },
      {

        path:'resetpwd',
        component:ResetpwdComponent
      },
      {
        path:'intro',
        component:IntroComponent

      },
      {
        path:'coupon-details',
        component: CouponDetailsComponent
      },
    ]
  }


]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
