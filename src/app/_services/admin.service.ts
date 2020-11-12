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

  //get single single user
  getUser(userId){
    return this.http.get<{message:string, user:User}>(`http://localhost:8080/api/user/users/${userId}`)
  }

  getUpdatedUsers(){
    return this.usersUpdatedListenner.asObservable()
  }

  //create user
  createUser(user: User){
    return this.http.post(`http://localhost:8080/api/user/register`, user);
  }

  //update user
  updateUser(userId:string,name:string,mobile:number,role:string){
    return this.http.patch(`http://localhost:8080/api/user/users/${userId}`,{
      _id:userId,
      name:name,
      mobile:mobile,
      role:role
    })
  }

  //delete user
  deleteUser(userId:string){
    return this.http.delete(`http://localhost:8080/api/user/users/${userId}`)
  }
}
