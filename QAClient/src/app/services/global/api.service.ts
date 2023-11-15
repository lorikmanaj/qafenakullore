import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Expose-Headers': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  post<HttpResponseModel, RequestModel = null>(path: string, data: RequestModel): Observable<HttpResponseModel> {
    const url = `${environment.apiUrl}/api/${path}`;
    return this.http.post<HttpResponseModel>(url, data, httpOptions);
  }

  getById<HttpResponseModel>(path: string, id: number): Observable<HttpResponseModel> {
    const url = `${environment.apiUrl}/api/${path}/${id}`;
    return this.http.get<HttpResponseModel>(url, httpOptions);
  }

  get<HttpResponseModel>(path: string): Observable<HttpResponseModel> {
    const url = `${environment.apiUrl}/api/${path}`;
    return this.http.get<HttpResponseModel>(url, httpOptions);
  }

  put<HttpResponseModel, RequestModel>(path: string, data: RequestModel): Observable<HttpResponseModel> {
    const url = `${environment.apiUrl}/api/${path}`;
    return this.http.put<HttpResponseModel>(url, data, httpOptions);
  }

  delete<HttpResponseModel>(path: string): Observable<HttpResponseModel> {
    const url = `${environment.apiUrl}/api/${path}`;
    return this.http.delete<HttpResponseModel>(url, httpOptions);
  }
}
