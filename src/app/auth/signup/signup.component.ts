import { AuthService } from './../../_services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    const name = form.value.name;
    const mobile = form.value.mobile;
    const password = form.value.password;
    this.authService
      .registerUser({
        name: name,
        mobile: mobile,
        password: password,
      })
      .subscribe((data) => {
        if (!data) {
          return;
        }
        console.log(data);
        this.router.navigate(['/login']);
      });
    // console.log(form.value);
  }
}
