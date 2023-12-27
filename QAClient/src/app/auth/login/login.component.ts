import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/products/cart.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin?: boolean;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private cartService: CartService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // this.loginForm = this.formBuilder.group({
    //   //grantType: "password",
    //   email: this.email,
    //   password: this.password
    //   //rememberMe: true,
    //   //refreshToken: ""
    // });

    //this.resetPasswordForm = this.formBuilder.group({resetPasswordEmail : this.resetPasswordEmail})
  }

  // email = new FormControl("", [Validators.required]);
  // password = new FormControl("", [
  //   Validators.required,
  //   Validators.minLength(8),
  // ]);

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login(email, password).subscribe(
        (response) => {
          console.log(response);
          // Handle successful login (if needed)
        },
        (error) => {
          console.error('Login failed:', error);
          this.invalidLogin = true;
        }
      );
    }
  }

  register(): void {
    if (this.registerForm.valid) {
      // Implement registration logic here
    }
  }

  switchTab(tab: 'login' | 'register'): void {
    // Reset form controls on tab switch
    this.loginForm.reset();
    this.registerForm.reset();

    if (tab === 'login') {
      // Switch to the Login tab
    } else {
      // Switch to the Register tab
    }
  }
}
