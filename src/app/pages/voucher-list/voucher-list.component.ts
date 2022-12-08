import { Component, OnInit } from '@angular/core';

import { userVoucherList } from 'src/app/model/voucher-user.model';
import { ToolBox } from 'src/app/utils/toolBox';
import { UserVoucherService } from 'src/app/_services/user-voucher.service';


@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.css']
})
export class VoucherListComponent implements OnInit {
  title:string = 'Mes coupons';
  UserVouchers: userVoucherList[] = [];
  voucherSelected?: userVoucherList;
  qrCode: any;
  isModalOpen: boolean = false;
  constructor(private voucherUserServices: UserVoucherService ) { }

  ngOnInit(): void {
    this.voucherUserServices.getAllUserVoucher(true).subscribe({
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
   });
  }

  toggleModdal(){
      this.isModalOpen= true;
      console.log(this.isModalOpen);
  }
  closeModal(){
    this.isModalOpen= false;
    this.voucherSelected = undefined;
  }
  renderVoucher(voucher : userVoucherList){
    this.toggleModdal();
    console.log(voucher);
    this.voucherSelected = voucher;
    // this.qrCode = ToolBox.generateQRCode(this.voucherSelected.urlCode);
    
  }


}
