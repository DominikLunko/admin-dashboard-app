import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/users/signin`, {email, password});
  }
  register(firstName: string, lastName: string, email: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/users/signup`, {firstName, lastName, email, password, confirmPassword});
  }
  logout(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/users/signout`);
  }
}
