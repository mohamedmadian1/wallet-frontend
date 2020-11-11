import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth-service.service';

@Injectable()
export class AuthGuard implements CanActivate , CanLoad{
  constructor(private authService: AuthService, private router: Router) {}
  
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Promise<boolean> | Observable<boolean> {
    let role:string;
    const isAuth = this.authService.getIsAuth();
    // return true
    const expectedRole = route.data.expectedRole;
      this.authService.getUser().subscribe(usrr=>{
        role = usrr.role
      });
    if(!isAuth || role !== expectedRole){
      this.router.navigate(["/login"]);
      return false
    }
    return true;
  }
  
}
