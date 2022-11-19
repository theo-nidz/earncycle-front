import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'users/' + id, { responseType: 'json' });
  }
  
}