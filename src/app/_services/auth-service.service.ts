import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthData } from '../_models/authData';
import { User } from '../_models/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private currentUser = new BehaviorSubject<AuthData>(null);
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getUser(){
   
    return this.currentUser.asObservable()
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  //register user
  registerUser(user: User) {
    return this.http.post(`http://localhost:8080/api/user/register`, user);
  }
  //login user
  login(mobile: number, password: string) {
    const authData: User = { mobile: mobile, password: password };
    this.http
      .post<AuthData>(
        'http://localhost:8080/api/user/login',
        authData
      )
      .subscribe((response) => {
        console.log('response', response);
        this.currentUser.next(response)
        const token = response.token;
        this.token = token;
        console.log("role", response.role)
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/transfer']);
        }
      });
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      // this.role = authInformation.role;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }
  private saveAuthData(token: string , expirationDate: Date) {
    localStorage.setItem('token', token);
    // localStorage.setItem('role', role);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    // localStorage.removeItem('role');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    // const role = localStorage.getItem('role');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      // role:role,
      expirationDate: new Date(expirationDate),
    };
  }
}
