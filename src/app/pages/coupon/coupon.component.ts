import { Component, OnInit } from '@angular/core';
import { VoucherService } from 'src/app/_services/voucher.service';
// Type
import { Voucher } from 'src/app/model/voucher.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  voucherList: Voucher[] = [];
  isMenuOpen = false;
  title:string = 'Coupons';
  isLogged:boolean = !!this.tokenStorage.getToken();

  constructor(private voucher: VoucherService, private tokenStorage: TokenStorageService,  private router:Router) { }

  ngOnInit(): void {
    this.voucher.getAllVoucher(true).subscribe({
      next: data => {
        this.voucherList = data;
       
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
