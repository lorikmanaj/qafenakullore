import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {

    // //get the jwt token which are present in the local storage
    // const token = localStorage.getItem("jwt");

    // //Check if the token is expired or not and if token is expired then redirect to login page and return false
    // if (token && !this.jwtHelper.isTokenExpired(token)) {
    //   return true;
    // }
    // this.router.navigate(["logins"]);
    // return false;

    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}