import { Component, OnInit } from '@angular/core';
import { userVoucherList } from 'src/app/model/voucher-user.model';
import { ToolBox } from 'src/app/utils/toolBox';
import { UserVoucherService } from 'src/app/_services/user-voucher.service';
import { VoucherService } from 'src/app/_services/voucher.service';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.css']
})
export class VoucherListComponent implements OnInit {
  title:string = 'Mes coupons';
  UserVouchers: userVoucherList[] = [];
  constructor(private voucherUserServices: UserVoucherService, private partnerService: VoucherService ) { }

  ngOnInit(): void {
    this.voucherUserServices.getUserVoucher().subscribe({
      next: data => {
        this.UserVouchers = data;
        this.processData();
        
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

  processData(){
    this.UserVouchers.forEach((item) => {
      item.voucherId.sDate = ToolBox.humanReadDate(item.voucherId.startDate);
      item.voucherId.eDate = ToolBox.humanReadDate(item.voucherId.endDate);
      const partnerId = ToolBox.getIdFromUrl(item.voucherId.partnerId);
      this.partnerService.getPartnerById(partnerId ,true).subscribe({
        next: data => {
          item.voucherId.partnerName = data.name;
        },
        error: err => {console.log(err)
          if (err.error) {
            console.error(JSON.parse(err.error).message);
          } else {
            console.error("Error with status: " + err.status);
          }
        }
      });
      
    });
  }

  renderVoucher(voucher : userVoucherList){
    console.log(voucher);
    
  }

}
