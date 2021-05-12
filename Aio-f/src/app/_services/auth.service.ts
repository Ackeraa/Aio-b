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
		return this.tokenService.registerAccount(data)
			.pipe(map(res => res.json()));
	}

	logIn(data):Observable<Response>{
		return this.tokenService.post('auth/sign_in', data)
			.pipe(map(res => {
				let user = res.json().data;
				this.signedIn$.next({
					user_id: user.id,
					user_name: user.name
				});
				return res.json();
			}));
	}

	logOut():Observable<Response>{
		return this.tokenService.signOut()
		   .pipe(map(res => {
				this.signedIn$.next(null);
				return res;
			}));
	}

	get(url: string, params: any = null): Observable<any> {
		if (params == null) {
			return this.tokenService.get(url)
				.pipe(map(res => res.json()));
		} else {
			let new_params = { search: params };
			return this.tokenService.get(url, new_params)
				.pipe(map(res => res.json()));
		}
	}

	post(url: string, body: any): Observable<any> {
		return this.tokenService.post(url, body)
				.pipe(map(res => res.json()));
	}

	ngOnInit(): void {
	}
}
