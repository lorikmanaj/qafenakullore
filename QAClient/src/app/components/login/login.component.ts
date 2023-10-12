import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import {environment} from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'logins',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  invalidLogin?: boolean;
  loginForm: FormGroup;


  url = environment.apiUrl + '';

  constructor(private formBuilder: FormBuilder,private router: Router, private http: HttpClient,private jwtHelper : JwtHelperService,
    private toastr: ToastrService) {
      this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
     }

  public login = (form: NgForm) => {
    const credentials = JSON.stringify(form.value);
    this.http.post(this.url +"/accounts/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.toastr.success("Logged In successfully");
      this.router.navigate(["/products/home"]);
    }, err => {
      this.invalidLogin = true;
    });
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

}
