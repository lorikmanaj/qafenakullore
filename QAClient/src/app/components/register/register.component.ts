import { AuthService } from '../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(private AuthService: AuthService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    });
  }

  public onSubmit() {
    this.AuthService.register(
      this.registerForm.get('email')!.value,
      this.registerForm!.get('password')!.value,
      this.registerForm.get('firstName')!.value,
      this.registerForm!.get('password')!.value
    );
  }

}
