import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  id: number | undefined;
  user?: any;
  isMenuOpen = false

  toggleMenu(){
    this.isMenuOpen= !this.isMenuOpen
  }
  logout(){
    this.tokenStorage.signOut()
    this.router.navigateByUrl('/')
  }

  constructor(private tokenStorage: TokenStorageService, private userService: UserService , private router:Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.id = this.tokenStorage.getUser().userId;
      console.log(this.id);
    }
    if(this.id != undefined){
      this.userService.getUserById(this.id).subscribe({
        next: data => {
          this.user = data;
          console.log(data);
        },
        error: err => {console.log(err)
          if (err.error) {
            console.error(JSON.parse(err.error).message);
          } else {
            console.error("Error with status: " + err.status);
          }
        }
      });
    }
  }

}
