import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CoreModule } from './core.module';
import { AuthService } from './auth-service.component';
import { Constants } from '../constants';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(Constants.apiRoot)) {
      return from(this._authService.getAccessToken().then(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const authReq = req.clone({ headers });
        return next.handle(authReq).pipe(tap(_ => { }, error => {
          let respError = error as HttpErrorResponse;
          if (respError && (respError.status === 401 || respError.status === 403)) {
            this._router.navigate(['/unauthorized']);
          }
        })).toPromise();
      }));
    } else {
      return next.handle(req);
    }
  }
}