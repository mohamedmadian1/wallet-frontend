
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User.model';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthService } from 'src/app/_services/auth-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users:User[] = []
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllUsers()
    this.adminService.getUpdatedUsers().subscribe(usersData=>{
      this.users = usersData.users
    })
  }

}

