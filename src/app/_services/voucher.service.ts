import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  private urlVoucher: string;
  private urlPartner: string;
  date: string;

  constructor(private http: HttpClient) {
    this.urlVoucher = environment.apiUrl + 'vouchers';
    this.urlPartner = environment.apiUrl + 'partners';
    this.date = this.returnDate();
   }


  getAllVoucher(json: boolean, deleted: boolean = false): Observable<any> {
    const request = this.urlVoucher + (json ? '.json' : '') + '?deleted=' + deleted + '&endDate%5Bafter%5D=' + this.date;
    return this.http.get(request, { responseType: 'json' });
  }

  getVoucher(id: number, json: boolean): Observable<any> {
    const request = this.urlVoucher + '/' + id + (json ? '.json' : '');
    return this.http.get(request, { responseType: 'json' });
  }

  // TODO: Can be improved, need to change in the api
  getVoucherByPartner(partnerId: number, json: boolean, deleted: boolean =false): Observable<any> {
    const request = this.urlPartner + '/' + partnerId + (json ? '.json' : '') + '&deleted=' + deleted;
    return this.http.get(request, { responseType: 'json' });
  }
  getPartnerById(id: number, json: boolean): Observable<any> {
    const request = this.urlPartner + '/' + id + (json ? '.json' : '');
    return this.http.get(request, { responseType: 'json' });
  }

  // function to get date in format url
  returnDate(): string {
    const dateNow = new Date();
    const iso = dateNow.toISOString();
    return iso.split('.').shift()!;
  }

}

