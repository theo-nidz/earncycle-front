import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import {Router} from "@angular/router";
// import { HeaderLogComponent } from 'src/app/component/header-log/header-log.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  // providers: [HeaderLogComponent]
})
export class ProfileComponent {
  id: number | undefined;
  user?: any;
  isMenuOpen = false;
  title:string = 'Profile';
  isLogged:boolean = !!this.tokenStorage.getToken();

  toggleMenu(){
    this.isMenuOpen= !this.isMenuOpen
  }
  logout(){
    this.tokenStorage.signOut()
    this.router.navigateByUrl('/')
    window.location.reload();
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
