import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { VoucherService } from 'src/app/_services/voucher.service';
import { UserVoucherService } from 'src/app/_services/user-voucher.service';
import { UserService } from 'src/app/_services/user.service';
import { Voucher } from 'src/app/model/voucher.model';
import { ToolBox } from 'src/app/utils/toolBox';
import { UserVoucher, UserWallet } from 'src/app/model/user.model';

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
  currentUser?: any;
  userId?: number;

  constructor(private route: ActivatedRoute, private voucherService: VoucherService, private userVoucherService: UserVoucherService, private tokenStorage: TokenStorageService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.idVoucher) {
      this.id = parseInt(this.idVoucher);
      this.voucherService.getVoucher(this.id, true).subscribe({
        next: data => {
          this.voucher = data;
          this.startDate = ToolBox.humanReadDate(data.startDate);
          this.endDate = ToolBox.humanReadDate(data.endDate);

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
    if (this.tokenStorage.getToken()) {
      this.userId = this.tokenStorage.getUser().userId;
    }
    if(this.userId != undefined){
      this.userService.getUserById(this.userId).subscribe({
        next: data => {
          this.currentUser = data;

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

  buyVoucher() {
    if (this.id && this.voucher) {
      const userVoucherNew: UserVoucher = {
        userId: "/api/users/" + this.userId,
        voucherId: "/api/vouchers/" + this.id,
        claim: 1
      };
      this.userVoucherService.getAllUserVoucher(true, this.id).subscribe({
        next: data => {
          if (data.length > 0) {
            const { id, userId, voucherId, claim } = data[0];

            if (claim < voucherId.limitUse && this.voucher!.price < this.currentUser?.wallet) {
              const userVoucher: UserVoucher = {
                userId: userId,
                voucherId:  "/api/vouchers/" + voucherId.id,
                claim: claim + 1
              }
              console.table(userVoucher);
              this.userVoucherService.updateUserVoucher(id, userVoucher).subscribe({
                next: data => {
                  this.debitAccount(this.voucher!.price);
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
            else {
              console.info("limite d'utilisation atteint");
              this.message = "limite d'utilisation atteint";
              return;
            }
          } else {
            this.userVoucherService.createUserVoucher(userVoucherNew).subscribe({
              next: data => {
                this.debitAccount(this.voucher!.price);
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

  debitAccount(amount: number) {
    const soustract = this.currentUser?.wallet - amount;
    if(soustract >= 0){
      const userWallet: UserWallet = {
        wallet: soustract,
      };
      this.userService.updateUserWallet(this.userId!, userWallet).subscribe({
        next: data => {
          console.log(data);
          console.info("Compte débité avec succès !");
        }
      });
    } else {
      console.info("pas assez d'argent");
      this.message = "Vous n'avez pas assez de pièces sur votre compte !";
    }
  }

  login(){
    this.router.navigate(['/login']);
  }

}
