import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-header-log',
  templateUrl: './header-log.component.html',
  styleUrls: ['./header-log.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderLogComponent implements OnInit {
  isMenuOpen:boolean = false
  isLogged:boolean = !!this.tokenStorage.getToken();
  headerTitle:string;


  toggleMenu(){
    this.isMenuOpen= !this.isMenuOpen
  }
  logout(){
    this.tokenStorage.signOut()
    this.router.navigateByUrl('/')
    window.location.reload();
  }
  constructor(private tokenStorage: TokenStorageService , private router:Router, @Inject(String) title: string) {
    this.headerTitle = title;
   }

  ngOnInit(): void {
    console.info("header");
  }
}
