import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// type
import { Rubbish } from '../rubbish.model';

@Injectable({
  providedIn: 'root'
})
export class RubbishService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'rubbishes';
   }

  //  Get all category
  getAllCategory(json: boolean, deleted: boolean = false): Observable<any> {
    const request = environment.apiUrl + 'catogies' + (json ? '.json' : '') + '?deleted=' + deleted;
    return this.http.get(request, { responseType: 'json' });
  }

  getAllRubbish(json: boolean, deleted: boolean = false): Observable<any> {
    const request = this.url + (json ? '.json' : '') + '?deleted=' + deleted;
    return this.http.get(request, { responseType: 'json' });
  }

  getRubbishByCategory(category: string, json: boolean, deleted: boolean =false): Observable<any> {
    const request = this.url + (json ? '.json' : '') + '?category.name=' + category + '&deleted=' + deleted;
    return this.http.get(request, { responseType: 'json' });
  }

  /**
   * 
   * @param rubbish 
   * @returns 
   * @example
   * rubbish = {
   * category = id of category
   * longitude = 123.123 : string
   * latitude = 123.123 : string
   * createdBy = id of user
   */
  createRubbish(rubbish: Rubbish): Observable<any> {
    return this.http.post(this.url, rubbish, { responseType: 'json' });
  }
}