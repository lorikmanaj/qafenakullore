import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

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
    private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.formBuilder.group({
      registerEmail: ['', [Validators.required, Validators.email]],
      registerPassword: ['', Validators.required],
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
      const { registerEmail, registerPassword } = this.registerForm.value;
      this.userService.register({ email: registerEmail, password: registerPassword }).subscribe(
        (response) => {
          if (response && response.token) {
            // Handle successful registration
            console.log(response);
          } else {
            console.error('Invalid response or missing token:', response);
          }
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
    }
  }

  switchTab(tab: 'login' | 'register'): void {
    this.loginForm.reset();
    this.registerForm.reset();

    const matTabGroup = document.getElementById('mat-tab-group') as any;

    if (tab === 'login') {
      matTabGroup.selectedIndex = 0;
    } else {
      matTabGroup.selectedIndex = 1;
    }
  }
}
