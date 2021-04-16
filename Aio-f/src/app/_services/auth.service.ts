import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';
import { Subject, Observable } from 'rxjs';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators'; 

@Injectable()
export class AuthService {

	public signedIn$:Subject<string> = new Subject();
	
	constructor(public tokenService: Angular2TokenService) {
		this.tokenService.validateToken().subscribe(
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
		return this.tokenService.registerAccount(data).pipe(map(
			res => {
				return res
			}
		));
	}

	logIn(data):Observable<Response>{

		return this.tokenService.post(
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
		return this.tokenService.signOut().pipe(map(
			res => {
				this.signedIn$.next(null);
				return res;
			}
		));
	}

	getValidateToken(): any{
		let token: any;
		this.tokenService.validateToken().subscribe(
			res => token = res
		);
		return token;
	}

	getCurrentUser(): any {
		return this.tokenService.currentUserData;
	}
}
