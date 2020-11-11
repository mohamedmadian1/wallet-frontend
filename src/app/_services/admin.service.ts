import { User } from './../_models/User.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private users: User[] = [];
  private usersUpdatedListenner = new Subject<{users: User[]}>()
  constructor(private http: HttpClient, private router: Router) { }

  //All users
  getAllUsers(){
    return this.http.get<{ message: string; users: User[];}>(`http://localhost:8080/api/user/users`)
    .subscribe((postsData) => {
      this.users = postsData.users;
      this.usersUpdatedListenner.next({
        users: [...this.users],
      });
    });
  }

  getUpdatedUsers(){
    return this.usersUpdatedListenner.asObservable()
  }

  //create user
  createUser(user: User){
    return this.http.post(`http://localhost:8080/api/user/register`, user);
  }
}
