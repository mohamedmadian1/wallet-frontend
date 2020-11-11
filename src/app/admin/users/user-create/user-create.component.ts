import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthService } from 'src/app/_services/auth-service.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router, private adminService:AdminService) { }

  ngOnInit(): void {
  }
  onSignup(form: NgForm) {
    const name = form.value.name;
    const mobile = form.value.mobile;
    const password = form.value.password;
    this.adminService
      .createUser({
        name: name,
        mobile: mobile,
        password: password,
      })
      .subscribe((data) => {
        if (!data) {
          return;
        }
        console.log(data);
        // this.router.navigate(['/login']);
      });
    // console.log(form.value);
  }
}
