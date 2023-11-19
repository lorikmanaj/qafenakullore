import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { UserService } from "../services/user.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
    isLogin: boolean = true;
    title = "Login";
    isSubmitting = false;
    authForm: FormGroup;
    destroy$ = new Subject<void>();

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly userService: UserService,
        private readonly formBuilder: FormBuilder,
    ) {
        this.authForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        })
    }

    ngOnInit(): void {
        this.isLogin = this.route.snapshot.url.at(-1)!.path === "login"
        this.title = this.isLogin ? "Login" : "Register";
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onSubmit($event: Event) {
        $event.preventDefault();

        let observable =
            this.isLogin
                ? this.userService.login(this.authForm.value as { email: string; password: string })
                : this.userService.register(
                    this.authForm.value as {
                        email: string;
                        password: string;
                        username: string;
                    }
                );

        observable.pipe(takeUntil(this.destroy$)).subscribe({
            next: () => void this.router.navigate(["/"]),
            error: (err) => { this.isSubmitting = false; console.log(err) }
        });
    }
}