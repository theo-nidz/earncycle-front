import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserVoucher } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserVoucherService {

  private url: string;
  

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'user_vouchers';
  }

  getAllUserVoucher(json: boolean, voucherId?: number , deleted: boolean = false): Observable<any> {
    const request = this.url + (json ? '.json' : '') + '?deleted=' + deleted + (voucherId ? '&voucherId.id=' + voucherId : '');
    return this.http.get(request, { responseType: 'json' });
  }

  getUserVoucher(): Observable<any> {
    const request = this.url + '_list';
    return this.http.get(request, { responseType: 'json' });
  }

  createUserVoucher(userVoucher: UserVoucher): Observable<any> {
    return this.http.post(this.url, userVoucher, { responseType: 'json' });
  }

  updateUserVoucher(idUserVoucher: number, userVoucher: UserVoucher): Observable<any> {
    return this.http.put(this.url + '/' + idUserVoucher , userVoucher, { responseType: 'json' });
  }

  deleteUserVoucher(idUserVoucher: number): Observable<any> {
    return this.http.put(this.url + '/' + idUserVoucher + '/deleted', { responseType: 'json' });
  }
  
}
