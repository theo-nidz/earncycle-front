import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + 'login_check', {
      email,
      password
    }, httpOptions);
  }

  register(user: User): Observable<any> {
    return this.http.post(environment.apiUrl + 'users', {   
      email: user.email,
      password: user.password,
      fname: user.fname,
      lname: user.lname,
    }, httpOptions);
  }

  // TODO to add in the api 
  // logout(): Observable<any> {
  //   return this.http.post(AUTH_API + 'logout', { }, httpOptions);
  // }
}