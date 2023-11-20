import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from '../auth/jwt.service';
import { environment } from 'src/app/environments/environment';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Access-Control-Expose-Headers': '*'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private jwtService: JwtService) {
  }

  post<HttpResponseModel, RequestModel>(path: string, data: RequestModel): Observable<HttpResponseModel> {
    const url = `${environment.apiUrl}/api/${path}`;
    return this.http.post<HttpResponseModel>(url, data);
  }

  getById<HttpResponseModel>(path: string, id: number): Observable<HttpResponseModel> {
    const url = `${environment.apiUrl}/api/${path}/${id}`;
    return this.http.get<HttpResponseModel>(url);
  }

  get<HttpResponseModel>(path: string): Observable<HttpResponseModel> {
    const url = `${environment.apiUrl}/api/${path}`;
    return this.http.get<HttpResponseModel>(url);
  }

  put<HttpResponseModel, RequestModel>(path: string, data: RequestModel): Observable<HttpResponseModel> {
    const url = `${environment.apiUrl}/api/${path}`;
    return this.http.put<HttpResponseModel>(url, data);
  }

  delete<HttpResponseModel>(path: string): Observable<HttpResponseModel> {
    const url = `${environment.apiUrl}/api/${path}`;
    return this.http.delete<HttpResponseModel>(url);
  }

  // private getHeaders(): HttpHeaders {
  //   const token = this.jwtService.getToken();
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   });
  // }

  // post<HttpResponseModel, RequestModel>(path: string, data: RequestModel): Observable<HttpResponseModel> {
  //   const url = `${environment.apiUrl}/api/${path}`;
  //   return this.http.post<HttpResponseModel>(url, data, { headers: this.getHeaders() });
  // }

  // getById<HttpResponseModel>(path: string, id: number): Observable<HttpResponseModel> {
  //   const url = `${environment.apiUrl}/api/${path}/${id}`;
  //   return this.http.get<HttpResponseModel>(url, { headers: this.getHeaders() });
  // }

  // get<HttpResponseModel>(path: string): Observable<HttpResponseModel> {
  //   const url = `${environment.apiUrl}/api/${path}`;
  //   return this.http.get<HttpResponseModel>(url, { headers: this.getHeaders() });
  // }

  // put<HttpResponseModel, RequestModel>(path: string, data: RequestModel): Observable<HttpResponseModel> {
  //   const url = `${environment.apiUrl}/api/${path}`;
  //   return this.http.put<HttpResponseModel>(url, data, { headers: this.getHeaders() });
  // }

  // delete<HttpResponseModel>(path: string): Observable<HttpResponseModel> {
  //   const url = `${environment.apiUrl}/api/${path}`;
  //   return this.http.delete<HttpResponseModel>(url, { headers: this.getHeaders() });
  // }

  ////^ works

  // post<HttpResponseModel, RequestModel>(path: string, data: RequestModel): Observable<HttpResponseModel> {
  //   const url = `${environment.apiUrl}/api/${path}`;
  //   return this.http.post<HttpResponseModel>(url, data, httpOptions);
  // }

  // getById<HttpResponseModel>(path: string, id: number): Observable<HttpResponseModel> {
  //   const url = `${environment.apiUrl}/api/${path}/${id}`;
  //   return this.http.get<HttpResponseModel>(url, httpOptions);
  // }

  // get<HttpResponseModel>(path: string): Observable<HttpResponseModel> {
  //   const url = `${environment.apiUrl}/api/${path}`;
  //   return this.http.get<HttpResponseModel>(url, httpOptions);
  // }

  // put<HttpResponseModel, RequestModel>(path: string, data: RequestModel): Observable<HttpResponseModel> {
  //   const url = `${environment.apiUrl}/api/${path}`;
  //   return this.http.put<HttpResponseModel>(url, data, httpOptions);
  // }

  // delete<HttpResponseModel>(path: string): Observable<HttpResponseModel> {
  //   const url = `${environment.apiUrl}/api/${path}`;
  //   return this.http.delete<HttpResponseModel>(url, httpOptions);
  // }
}
