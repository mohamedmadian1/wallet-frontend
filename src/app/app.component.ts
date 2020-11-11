import { AuthService } from './_services/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'wallet-angular';
  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authService.autoAuthUser()
  }
}
