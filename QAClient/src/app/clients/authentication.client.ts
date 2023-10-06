import { environment } from '../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<string> {
    return this.http.post(
      environment.apiUrl + '/Account/login',
      {
        email: email,
        password: password,
      },
      { responseType: 'text' }
    );
  }

  public register(

    email: string,
    password: string,
    firstName: string,
        lastName: string
  ): Observable<string> {
    return this.http.post(
      environment.apiUrl + '/Account/register',
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
