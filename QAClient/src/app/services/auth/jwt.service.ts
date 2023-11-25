import { Injectable } from "@angular/core";
import * as jwt_decode from "jwt-decode";
import { JwtHelperService } from "@auth0/angular-jwt";
import { JwtToken } from "src/app/models/jwt-token";
@Injectable({ providedIn: "root" })
export class JwtService {

  private decodedToken: JwtToken | null = null;

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken(): JwtToken | null {
    const helper = new JwtHelperService();
    const token = this.getToken();

    if (token && !helper.isTokenExpired(token)) {
      const decoded = helper.decodeToken(token) as JwtToken;
      console.log('Decoded Token:', decoded);

      //Perform additional validation or checks here

      return decoded;
    }

    return null;
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token)
    this.decodeToken();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // For simplicity, consider the user authenticated if a token is present
  }

  purgeAuth(): void {
    localStorage.removeItem('token')
    this.decodedToken = null;
  }

  hasRole(role: string): boolean {
    const decodedToken = this.decodeToken();
    return decodedToken?.role?.includes(role) ?? false;
  }

}
