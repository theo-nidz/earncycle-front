import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthRouterGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // TODO To delete
    console.log('authGuard#canActivate called');
    if (AppComponent.isLoggedIn && AppComponent.isAdmin) {
      // Add link to admin page
      return true;
    }
    if (AppComponent.isLoggedIn && AppComponent.isUser) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
  
}
