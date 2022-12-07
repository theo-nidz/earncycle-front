import { Component, Input, OnInit } from '@angular/core';
import { Voucher } from 'src/app/model/voucher.model';
import { VoucherService } from 'src/app/_services/voucher.service';

@Component({
  selector: 'app-voucher-box',
  templateUrl: './voucher-box.component.html',
  styleUrls: ['./voucher-box.component.css']
})
export class VoucherBoxComponent implements OnInit {
  id!: number;
  image!: string;
  partner!: string;
  name!: string;
  description!: string;
  price!: number;
  limitUse!: number;
  startDate!: string;
  endDate!: string;

  @Input()
  VoucherData!: Voucher;

  constructor(private partnerService: VoucherService) { }

  ngOnInit(): void {
    this.id = this.VoucherData.id;
    this.image = this.VoucherData.image;
    this.name = this.VoucherData.name;
    this.description = this.VoucherData.description;
    this.price = this.VoucherData.price;
    this.limitUse = this.VoucherData.limitUse;
    this.startDate = this.humanReadDate(this.VoucherData.startDate);
    this.endDate = this.humanReadDate(this.VoucherData.endDate);
    
    if(this.VoucherData.partnerId !== undefined){
      const partnerId = parseInt(this.VoucherData.partnerId.split('/').pop()!);
      this.partnerService.getPartnerById(partnerId ,true).subscribe({
        next: data => {
          this.partner = data.name;
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

  humanReadDate(date: Date):string{
    const d = new Date(date);
    return d.toLocaleDateString("fr-FR", {month: 'long', day: 'numeric', year: 'numeric'});
  }

}
