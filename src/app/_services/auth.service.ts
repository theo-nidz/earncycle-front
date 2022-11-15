import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:8000/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login_check', {
      email,
      password
    }, httpOptions);
  }

  register(
    email: string, 
    password: string,
    lname: string,
    fname: string,
    phone: string,
    adress:string,
    nickname:string
    ): Observable<any> {
    return this.http.post(AUTH_API + 'users', {   
      email,
      password,
      lname,
      fname,
      phone,
      adress,
      nickname
    }, httpOptions);
  }

  // TODO to add in the api 
  // logout(): Observable<any> {
  //   return this.http.post(AUTH_API + 'logout', { }, httpOptions);
  // }
}