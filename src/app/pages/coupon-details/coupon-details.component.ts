import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { VoucherService } from 'src/app/_services/voucher.service';
import { Voucher } from 'src/app/model/voucher.model';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.css']
})
export class CouponDetailsComponent implements OnInit {
  isMenuOpen = false;
  title:string = 'Coupons';
  isLogged:boolean = !!this.tokenStorage.getToken();
  idVoucher = this.route.snapshot.paramMap.get('id');
  voucher?: Voucher;

  toggleMenu(){
    this.isMenuOpen= !this.isMenuOpen
  }
  logout(){
    this.tokenStorage.signOut()
    this.router.navigateByUrl('/')
    window.location.reload();
  }
  constructor(private route: ActivatedRoute, private voucherService: VoucherService, private tokenStorage: TokenStorageService, private router:Router) { }

  ngOnInit(): void {
    if(this.idVoucher){
    const id = parseInt(this.idVoucher);
    this.voucherService.getVoucher(id ,true).subscribe({
      next: data => {
        this.voucher = data;
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
