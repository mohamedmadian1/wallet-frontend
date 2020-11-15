import { AdminService } from './_services/admin.service';
import { AuthService } from './_services/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'wallet-angular';
  isLoggedIn: boolean = true;

  constructor(private authService: AuthService, private adminService:AdminService) { }
  ngOnInit() {
   
    // this.authService.autoAuthUser()
  }
}
