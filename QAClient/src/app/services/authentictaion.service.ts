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
      this.router.navigate(['/products/qafore']);
    })
  }

  public register( email: string, password: string, firstName: string, lastName: string,): void {
    this.authenticationClient
    .register(email,password,firstName,lastName).subscribe((token) => {
      localStorage.setItem(this.tokenKey, token)
      this.router.navigate(['products/home'])
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
