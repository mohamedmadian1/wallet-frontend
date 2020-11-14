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
  // private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
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
      .post<AuthData>('http://localhost:8080/api/user/login', authData)
      .subscribe((response) => {
        console.log('response', response);
        const token = response.token;
        const userId = response._id;
        this.token = token;
        console.log('role', response.role);
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, userId);
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

  // autoAuthUser() {
  //   let role;
  //   const authInformation = this.getAuthData();
  //   if (!authInformation) {
  //     return;
  //   }
  //   const now = new Date();
  //   const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
  //   if (expiresIn > 0) {
  //     this.token = authInformation.token;
  //     this.setAuthTimer(expiresIn / 1000);
  //     this.authStatusListener.next(true);
  //   }
  // }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return false;
    }
    this.authStatusListener.next(true);
    return true;
  }

  logout() {
    this.token = null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiration');
  }

  // private getAuthData() {
  //   const token = localStorage.getItem('token');
  //   const userId = localStorage.getItem('userId');
  //   const expirationDate = localStorage.getItem('expiration');
  //   if (!token || !expirationDate) {
  //     return;
  //   }
  //   return {
  //     token: token,
  //     userId: userId,
  //     expirationDate: new Date(expirationDate),
  //   };
  // }
}
