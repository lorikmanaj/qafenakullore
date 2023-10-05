import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../clients/authentication.client';


@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  private tokenKey = 'token';

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router
  ) { }


  public login(email: string, password: string): void {
    this.authenticationClient.login(email, password).subscribe((token) => {
      localStorage.setItem(this.tokenKey, token)
      this.router.navigate(['/']);
    })
  }

  public register( email: string, password: string): void {
    this.authenticationClient
    .register(email,password).subscribe((token) => {
      localStorage.setItem(this.tokenKey, token)
      this.router.navigate(['/'])
    })
  }
  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);

  }
  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
