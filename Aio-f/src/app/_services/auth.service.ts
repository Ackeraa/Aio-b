import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';
import { Subject, Observable } from 'rxjs';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators'; 

@Injectable()
export class AuthService {

	public signedIn$:Subject<boolean> = new Subject();
	
	constructor(public authService: Angular2TokenService) {

		this.authService.validateToken().subscribe(
			res => res.status == 200 ? this.signedIn$.next(res.json().success)
				: this.signedIn$.next(false)
		)
	}

	register(data: {name: string, email:string, password:string, passwordConfirmation:string}):
		Observable<Response>{
		return this.authService.registerAccount(data).pipe(map(
			res => {
				this.signedIn$.next(true);
				return res
			}
		));
	}


	logIn(data: {email: string, password:string}):Observable<Response>{

		return this.authService.post(
			'auth/sign_in',
			data
		).pipe(map(
			res => {
				this.signedIn$.next(true);
				return res;
			}
		));
		/*
		return this.authService.signIn(data).pipe(map(
			res => {
				this.signedIn$.next(true);
				return res
			}
		));
		*/
	}

	logOut():Observable<Response>{
		return this.authService.signOut().pipe(map(
			res => {
				this.signedIn$.next(false);
				return res;
			}
		));
	}

	getValidateToken():any{
		let token: any;
		this.authService.validateToken().subscribe(
			res => token = res
		);
		return token;
	}
	getCurrentUser(): any{
		return this.authService.currentUserData;
	}
}
