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

	register(signUpData: {email:string, password:string, passwordConfirmation:string}):
		Observable<Response>{
		return this.authService.registerAccount({
			email: "fuck@ab.com",
			name: "fuck",
			password: "000000",
			passwordConfirmation: "000000"
		}
		).pipe(map(
			res => {
				this.signedIn$.next(true);
				return res
			}
		));
	}

	logIn(data: {email:string, password:string}):Observable<Response>{
		return this.authService.signIn(data).pipe(map(
			res => {
				this.signedIn$.next(true);
				return res
			}
		));
	}

	logOut():Observable<Response>{
		return this.authService.signOut().pipe(map(
			res => {
				this.signedIn$.next(false);
				return res;
			}
		));
	}

	getCurrentUser(): any{
		return this.authService.currentUserData;
	}
}
