import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            
        console.log("TOKENI ", token);
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}`}
            });
        }

        console.log('Request URL:', req.url); // Log the request URL
        console.log('Headers:', req.headers);

        return next.handle(req);
    }
}