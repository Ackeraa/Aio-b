import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';
import { Subject, Observable } from 'rxjs';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators'; 

@Injectable()
export class AuthService {

	public signedIn$:Subject<string> = new Subject();
	
	constructor(public authService: Angular2TokenService) {
		this.authService.validateToken().subscribe(
			res => {
				if (res.status == 200){
					this.signedIn$.next(res.json().data.name);
				} else {
					this.signedIn$.next(null);
				}
			},
		)
	}

	register(data: {name: string, email:string, password:string, passwordConfirmation:string}):
		Observable<Response>{
		return this.authService.registerAccount(data).pipe(map(
			res => {
				return res
			}
		));
	}

	logIn(data):Observable<Response>{

		return this.authService.post(
			'auth/sign_in',
			data
		).pipe(map(
			res => {
				this.signedIn$.next(res.json().data.name);
				return res;
			}
		));
	}

	logOut():Observable<Response>{
		return this.authService.signOut().pipe(map(
			res => {
				this.signedIn$.next(null);
				return res;
			}
		));
	}

	getValidateToken(): any{
		let token: any;
		this.authService.validateToken().subscribe(
			res => token = res
		);
		return token;
	}

	getCurrentUser(): any {
		return this.authService.currentUserData;
	}
}
