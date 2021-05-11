import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators'; 
import { Angular2TokenService } from 'angular2-token';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { AuthService } from '../_services';
import { SearchService } from '../_components';

@Injectable({
	providedIn: 'root'
})
export class ProblemService implements OnInit {

	problem$: BehaviorSubject<any> = new BehaviorSubject(null);

	constructor(private authService: AuthService,
				private cableService: ActionCableService,
				private tokenService: Angular2TokenService,
				private searchService: SearchService) {
	}

	ngOnInit() {
	}

	getProblem(source: string, id: string): void {
		let url: string;
		if (source === 'aio') {
			url = 'problems/' + id;
		} else {
			url = 'vproblems/' + id;
		}
		this.tokenService.get(url)
		    .pipe(map(res => res.json()))
			.subscribe(problem => {
				this.problem$.next(problem);
			});
	}

	reSpideProblem(): Observable<any> {
		let id;
		this.problem$
		    .subscribe( problem => {
				id = problem.id;
			});
		let url = 'vproblems/' + id + '/respide';
		return this.tokenService.get(url)
				   .pipe(map(res => res.json()));
	}

	submitProblem(language: any, code: string): Observable<any> {
		return combineLatest(this.problem$, this.authService.signedIn$)
			.pipe(
				filter(([x, y]) => x != null && y != null),
			    switchMap(([problem, user]) => {
					let url, body;
					if (problem.source == 'aio') {
						url = 'problems/' + problem.id + '/submit';
					} else {
						url = 'vproblems/' + problem.id + '/submit';
					} 
					body = {
						language: language,
						code: code,
						user_id: user.user_id
					};
					return this.tokenService.post(url, body)
						.pipe(map(res => res.json()));
				})
			);
	}

}
