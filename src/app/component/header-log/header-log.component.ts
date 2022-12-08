import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-header-log',
  templateUrl: './header-log.component.html',
  styleUrls: ['./header-log.component.css'],
})
export class HeaderLogComponent implements OnInit {
  isMenuOpen:boolean = false
  isLogged:boolean = !!this.tokenStorage.getToken();
  @Input()
  title!: string;

  constructor(private tokenStorage: TokenStorageService , private router:Router) {
   }

  ngOnInit(): void {
  }
  
  toggleMenu(){
    this.isMenuOpen= !this.isMenuOpen
  }
  back(){
    if(this.router.url == '/login'){
      window.history.back();
    } else{
      this.router.navigateByUrl('/');
    }
  }
  logout(){
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/');
    window.location.reload();
  }
  login(){
    this.router.navigateByUrl('/login');
  }
  register(){
    this.router.navigateByUrl('/register');
  }
  accountSetup(){
    this.router.navigateByUrl('/mon-compte');
  }
}
