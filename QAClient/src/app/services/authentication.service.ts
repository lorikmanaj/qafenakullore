import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../clients/authentication.client';
import { AuthResponse } from '../models/authResponse';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  userLoggedIn = false;

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router
  ) { }

  // public login(email: string, password: string): void {
  //   this.authenticationClient.login(email, password).subscribe(
  //     (authResponse: AuthResponse) => {
  //       localStorage.setItem(this.tokenKey, authResponse.token);
  //       this.router.navigate(['/products/home']);
  //     },
  //     (error) => {
  //       // Handle login error
  //     }
  //   );
  // }
  public login(email: string, password: string): Observable<AuthResponse> {
    return this.authenticationClient.login(email, password).pipe(

      tap((authResponse: AuthResponse) => {
        localStorage.setItem(this.tokenKey, authResponse.token);
        this.userLoggedIn = true;
        this.router.navigate(['/products/home']);
      })
    );
  }

  public register(email: string, password: string, firstName: string, lastName: string,): void {
    this.authenticationClient
      .register(email, password, firstName, lastName).subscribe((token) => {
        localStorage.setItem(this.tokenKey, token)
        this.router.navigate(['products/home'])
      })
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.userLoggedIn = false;
    this.router.navigate(['/home']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    let res = token != null && token.length > 0;
    console.log(res);
    return res;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
