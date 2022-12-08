import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import {Router} from "@angular/router";
import { UserVoucherService } from 'src/app/_services/user-voucher.service';
import { userVoucherList } from 'src/app/model/voucher-user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  id: number | undefined;
  user?: any;
  isMenuOpen = false;
  title:string = 'Profile';
  isLogged:boolean = !!this.tokenStorage.getToken();
  loading= false;
  nbVoucher: number = 0;
  constructor(private tokenStorage: TokenStorageService, private userService: UserService , private voucherUserServices: UserVoucherService , private router:Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.id = this.tokenStorage.getUser().userId;
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
    this.voucherUserServices.getAllUserVoucher(true).subscribe({
      next: data => {
        this.nbVoucher = data.reduce((acc:number , item: userVoucherList) => acc + item.claim, 0);
      }
    });

  }

}
