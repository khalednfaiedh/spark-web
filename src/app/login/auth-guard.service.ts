import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          console.log("authenticated",authenticated);
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
        }),
      );
  }
  // canActivate() {
  //   return true;
  // }

  // canActivateChild() {
  //   return true;
  // }
}