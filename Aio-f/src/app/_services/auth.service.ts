import { Injectable, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { BehaviorSubject, Observable, AsyncSubject } from 'rxjs';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators'; 

@Injectable()
export class AuthService implements OnInit{

	public signedIn$: BehaviorSubject<any> = new BehaviorSubject(null);
	
	constructor(public tokenService: Angular2TokenService) {
		this.tokenService.validateToken().subscribe(
			res => {
				if (res.status == 200){
					let user = res.json().data;
					this.signedIn$.next({
						user_id: user.id,
						user_name: user.name
					});
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
				let user = res.json().data;
				this.signedIn$.next({
					user_id: user.id,
					user_name: user.name
				});
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

	ngOnInit(): void {
	}
}
