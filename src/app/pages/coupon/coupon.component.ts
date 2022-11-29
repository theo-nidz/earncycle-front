import { Component, OnInit } from '@angular/core';
import { VoucherService } from 'src/app/_services/voucher.service';
// Type
import { Voucher } from 'src/app/voucher.model';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  voucherList: Voucher[] = [];
  constructor(private voucher: VoucherService) { }

  ngOnInit(): void {
    this.voucher.getAllVoucher(true).subscribe({
      next: data => {
        this.voucherList = data;
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