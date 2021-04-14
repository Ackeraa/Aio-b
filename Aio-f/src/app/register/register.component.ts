import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	FormBuilder,
	FormGroup,
	Validators,
	FormControl,
	AbstractControl
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthService } from '../_services';
	
@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
	name: AbstractControl;
	email: AbstractControl; 
	password: AbstractControl;
	password_confirmation: AbstractControl;

    loading = false;
    submitted = false;
	name_exists = false;
	email_exists = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService
    ) {
        // Redirect to home if already logged in.
        if (localStorage.getItem('currentUser')) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.compose([Validators.required,
										  Validators.minLength(1), 
										  Validators.maxLength(10),
										  this.nameValidator])],
            email: ['', Validators.compose([Validators.required,
											this.emailValidator])],
            password: ['', [Validators.required,
							Validators.minLength(6),
							Validators.maxLength(16)]],
            password_confirmation: ['', Validators.required]
        });
		this.name = this.form.controls['name'];
		this.email = this.form.controls['email'];
		this.password = this.form.controls['password'];
		this.password_confirmation = this.form.controls['password_confirmation'];
    }

	// Validators for name.
	nameValidator(name: FormControl): {[s: string]: boolean} {
		if (!name.value.match(/^[A-Za-z]+[A-Za-z0-9_]+$/)){
			return { invalidName: true };
		}
	}

	// Validators for email.
	emailValidator(email: FormControl): {[s: string]: boolean} {
		let regex = new RegExp(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i);
		if (!email.value.match(regex)){
			return { invalidEmail: true };
		}
	}

	// Validators for confirm_password.
	confirmValidator(confirm_pwd: FormControl): {[s: string]: boolean} {
		let pwd = this.form.get('password').value;
		if (!confirm_pwd.value === pwd){
			return { invalidConfirm: true };
		}
	}

	
    // Convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // Reset alerts on submit
        this.alertService.clear();

        // Stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
		this.name_exists = false;
		this.email_exists = false;

        this.authService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful, Please confirm your\
											   emali before login.', true);
                    this.router.navigate(['/login']);
                },
                error => {
					let errors = JSON.parse(error["_body"]).errors;
					console.log(errors);
					if (errors.name) {
						this.name_exists = true;
					}
					if (errors.email) {
						this.email_exists = true;
					}
                    this.loading = false;
                });
    }
}
