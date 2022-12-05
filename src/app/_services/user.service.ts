import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserTrees, UserWallet, UserUpdate } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'users';
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id, { responseType: 'json' });
  }
  
  updateUserersonalInfo(id: number, data: UserUpdate): Observable<any> {
    return this.http.put(this.url + '/' + id, data, { responseType: 'json' });
  }

  updateUserWallet(id: number, amount: UserWallet): Observable<any> {

    return this.http.put(this.url + '/' + id, amount, { responseType: 'json' });
  }
  updateUserTrees(id: number, trees: UserTrees): Observable<any> {
    return this.http.put(this.url + '/' + id, trees, { responseType: 'json' });
  }
}
