
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { AppService } from '../login1/app.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AppService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    //const authToken = "Bearer " + Cookie.get('access_token');
    const authToken = "Bearer " + localStorage.getItem('access_token');
    if (this.router.url == "/auth/login") {
      return next.handle(req);
    }
    // else if (Cookie.get('access_token')) {
    //   const authReq = req.clone({
    //     headers: req.headers.set
    //       ('Content-type', 'application/json; charset=utf-8')
    //       .set
    //       ('Authorization', authToken)
    //   });
    else if (localStorage.getItem('access_token')) {
      const authReq = req.clone({
        headers: req.headers
        //.set ('Content-type', 'application/json; charset=utf-8')
          .set
          ('Authorization', authToken)
      });
      return next.handle(authReq).pipe(tap(() => { },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              return;
            }
            this.router.navigate(['/auth/login']);
          }
        }));
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}