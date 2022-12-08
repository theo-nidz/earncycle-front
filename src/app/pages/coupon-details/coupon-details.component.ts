import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { VoucherService } from 'src/app/_services/voucher.service';
import { UserVoucherService } from 'src/app/_services/user-voucher.service';
import { Voucher } from 'src/app/model/voucher.model';
import { ToolBox } from 'src/app/utils/toolBox';
import { UserVoucher } from 'src/app/model/user.model';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.css']
})
export class CouponDetailsComponent implements OnInit {
  isMenuOpen = false;
  title: string = 'Coupon Details';
  isLogged: boolean = !!this.tokenStorage.getToken();
  idVoucher = this.route.snapshot.paramMap.get('id');
  id?: number;
  voucher?: Voucher;
  startDate?: string;
  endDate?: string;
  message?: string;

  constructor(private route: ActivatedRoute, private voucherService: VoucherService, private userVoucherService: UserVoucherService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.idVoucher) {
      this.id = parseInt(this.idVoucher);
      this.voucherService.getVoucher(this.id, true).subscribe({
        next: data => {
          this.voucher = data;
          this.startDate = ToolBox.humanReadDate(data.startDate);
          this.endDate = ToolBox.humanReadDate(data.endDate);
          console.log(data);
        },
        error: err => {
          console.log(err)
          if (err.error) {
            console.error(JSON.parse(err.error).message);
          } else {
            console.error("Error with status: " + err.status);
          }
        }
      });
    }
  }

  buyVoucher() {
    if (this.id) {
      const user = this.tokenStorage.getUser().userId;
      const userVoucherNew: UserVoucher = {
        userId: "/api/users/" + user,
        voucherId: "/api/vouchers/" + this.id,
        claim: 1
      };
      this.userVoucherService.getAllUserVoucher(true, this.id).subscribe({
        next: data => {
          if (data.length > 0) {
            const { id, userId, voucherId, claim } = data[0];
            console.log(id, userId, voucherId);
            if (claim >= voucherId.limitUse) {
              console.log("limite d'utilisation atteint");
              this.message = "limite d'utilisation atteint";
            }
            else {
              const userVoucher: UserVoucher = {
                userId: userId,
                voucherId: voucherId,
                claim: claim + 1
              }
              this.userVoucherService.updateUserVoucher(id, userVoucher).subscribe({
                next: data => {
                  console.log(data);
                  this.message = "Coupon ajouté";
                  this.router.navigate(['/profile/mes-coupons']);

                },
                error: err => {
                  console.log(err)
                  if (err.error) {
                    console.error(JSON.parse(err.error).message);
                  } else {
                    console.error("Error with status: " + err.status);
                  }
                }
              });
            }
          } else {
            this.userVoucherService.createUserVoucher(userVoucherNew).subscribe({
              next: data => {
                console.log(data);
                this.message = "Coupon ajouté";
                this.router.navigate(['/profile/mes-coupons']);
              },
              error: err => {
                console.log(err);
                this.message = "Coupon non ajouté";
                if (err.error) {
                  console.error(JSON.parse(err.error).message);
                } else {
                  console.error("Error with status: " + err.status);
                }
              }
            });
          }
        },
        error: err => {
          console.log(err)
          if (err.error) {
            console.error(JSON.parse(err.error).message);
          }
        }
      });
    }
  }

}
