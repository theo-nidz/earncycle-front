import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { LayoutMenuComponent } from './layouts/layout-menu/layout-menu.component';
import { LayoutNomenuComponent } from './layouts/layout-nomenu/layout-nomenu.component';
import { ErrorComponent } from './pages/error/error.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { TosComponent } from './pages/tos/tos.component';
import { VouchersComponent } from './pages/vouchers/vouchers.component';



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
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'vouchers',
        component:VouchersComponent
      },
      {
        path:'error',
        component:ErrorComponent
      },

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
      }
    ]
  }


]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
