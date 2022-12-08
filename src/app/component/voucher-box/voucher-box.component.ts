import { Component, Input, OnInit } from '@angular/core';
import { Voucher } from 'src/app/model/voucher.model';
import { ToolBox } from 'src/app/utils/toolBox';


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

  constructor() { }

  ngOnInit(): void {
    this.id = this.VoucherData.id;
    this.image = this.VoucherData.image;
    this.name = this.VoucherData.name;
    this.description = this.VoucherData.description;
    this.price = this.VoucherData.price;
    this.limitUse = this.VoucherData.limitUse;
    this.partner = this.VoucherData.partnerId?.name;
    this.startDate = ToolBox.humanReadDate(this.VoucherData.startDate);
    this.endDate = ToolBox.humanReadDate(this.VoucherData.endDate);
  }
}
