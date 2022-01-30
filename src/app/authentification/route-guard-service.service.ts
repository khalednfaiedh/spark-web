import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,  RouterStateSnapshot, Router} from '@angular/router';
import { Authorities } from '../authorisation/authorities';
@Injectable({
  providedIn: 'root'
})
export class RouteGuardServiceService  implements CanActivate {
 

  constructor(
    private router: Router) 
    { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
       var   authoritie  :string
       authoritie  = route.data['authoritie'];
    if( Authorities.getUserInfo().authorities.indexOf(authoritie) >= 0)
    {
      return true;  
    }
    localStorage.removeItem('access_token');
    localStorage.clear();
    this.router.navigate(['auth/login']);
     return   false;
  }
 
}
