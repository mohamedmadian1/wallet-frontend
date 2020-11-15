import { AuthService } from './../_services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../_services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isOpen: boolean = false;
  userIsAuthenticated = false;
  role: string;
  private authListenerSubs: Subscription;

  constructor(
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    this.adminService.getUser(userId).subscribe((userData) => {
      //  console.log(user)
      if (userData) {
        this.role = userData.user.role;
      }
    });

    // this.userIsAuthenticated = this.authService.isLoggedIn();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe((isAuth) => {
      this.userIsAuthenticated = isAuth;
    });
    // this.authListenerSubs = this.authService
    //   .getAuthStatusListener()
    //   .subscribe((isAuth) => {
    //     this.userIsAuthenticated = isAuth;
    //   });
  }

  togglerNavBar() {
    this.isOpen = !this.isOpen;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
