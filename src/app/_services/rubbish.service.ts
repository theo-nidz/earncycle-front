import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RubbishService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'rubbishes';
   }


  getAllRubbish(json: boolean, deleted: boolean = false): Observable<any> {
    const request = this.url + (json ? '.json' : '') + '?deleted=' + deleted;
    return this.http.get(request, { responseType: 'json' });
  }

  getRubbishByCategory(category: string, json: boolean, deleted: boolean =false): Observable<any> {
    const request = this.url + (json ? '.json' : '') + '?category.name=' + category + '&deleted=' + deleted;
    return this.http.get(request, { responseType: 'json' });
  }
}
  
