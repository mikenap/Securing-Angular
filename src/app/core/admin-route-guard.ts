import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service.component';

@Injectable()
export class AdminRouteGuard implements CanActivate {
  
  constructor(private _authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAdmin = !!this._authService.authContext && this._authService.authContext.isAdmin;
    // return !!this._authService.authContext && this._authService.authContext.isAdmin; 
    console.log(isAdmin);
    console.log(this._authService.authContext);
    return isAdmin;
  }
}