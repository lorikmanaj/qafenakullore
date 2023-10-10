import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { AuthResponse } from '../models/authResponse';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) { }

  // public login(email: string, password: string): Observable<AuthResponse> {
  //   const loginDTO = {
  //     email: email,
  //     password: password,
  //   };

  //   return this.http.post<AuthResponse>(
  //     `${environment.apiUrl}/Account/Login`,
  //     loginDTO
  //   );
  // }

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      environment.apiUrl + 'Account/login',
      {
        email: email,
        password: password,
      }
    ).pipe(
      catchError((error) => {
        // Handle login error here
        console.error('Login error:', error);
        return throwError('Login failed'); // You can customize the error message here
      })
    );
  }


  public register(

    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<string> {
    return this.http.post(
      environment.apiUrl + '/Account/Register',
      {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      },
      { responseType: 'text' }
    );
  }
}
