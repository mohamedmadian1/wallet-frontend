import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private adminService: AdminService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    console.log('inside admin guard');
    return new Promise((resolve, reject) => {
      const userId = localStorage.getItem('userId');
      this.adminService.getUser(userId).subscribe(
        (userData) => {
          if (userData.user.role === 'admin') {
            console.log('inside admin guard resolve');

            // return true;
            resolve(true);
          } else {
            console.log('inside admin guard reject');

            this.router.navigate(['/']);
            //    return false;
            resolve(false);
          }
        },
        (err) => {
          this.router.navigate(['/']);
          resolve(false);
        }
      );
    });
  }
}
