import { AuthService } from './../_services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isOpen: boolean = false;
  userIsAuthenticated = false;
  role:string;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
     this.authService.getUser()
     .subscribe(user=>{
       console.log(user)
       if(user){

         this.role = user.role;
       }
      //  this.role = role
     });
    // console.log(this.authService.getRole())
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuth) => {
        this.userIsAuthenticated = isAuth;
      });
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
