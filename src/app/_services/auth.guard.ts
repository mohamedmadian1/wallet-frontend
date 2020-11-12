import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from './auth-service.service';

@Injectable()
export class AuthGuard implements CanActivate , CanLoad, OnDestroy{
  private currentUserRolrSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}
  
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    console.log("inside guard");

    const isAuth = this.authService.getIsAuth();

    if (!isAuth) {
      this.router.navigate(['/login']);
    }

    const expectedRole = route.data.expectedRole;
    console.log(expectedRole)

    let role;

    console.log(expectedRole);

    if(expectedRole != null){



      this.authService.getUser().subscribe(user=>{
        console.log(user)
        role = user.role
        console.log('role', role);

      });


      if(role !== expectedRole){
        this.router.navigate(["/"]);
        return false
      }
      
    }

    return isAuth;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Promise<boolean> | Observable<boolean> {
   return;
    let role:string;
    // const isAuth = this.authService.getIsAuth();
    // return true
    const expectedRole = route.data.expectedRole;
      this.authService.getUser().subscribe(usrr=>{
        role = usrr.role
      });

      console.log(role);
      console.log(expectedRole);


    if(role !== expectedRole){
      this.router.navigate(["/login"]);
      return false
    }
    return true;
  }

  ngOnDestroy(){
    if(this.currentUserRolrSub){
      this.currentUserRolrSub.unsubscribe()
    }
  }
  
}
