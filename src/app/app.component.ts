import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'earn-cycle';
  private roles: string[] = [];
  static isAdmin = false;
  static isUser = false;
  static isLoggedIn = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    AppComponent.isLoggedIn = !!this.tokenStorageService.getToken();

    if ( AppComponent.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      AppComponent.isUser = this.roles.includes('ROLE_USER');
      AppComponent.isAdmin = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
