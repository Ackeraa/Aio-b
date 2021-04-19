import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, Observable, AsyncSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from '../_services';

@Injectable({
	providedIn: 'root'
})
export class ProblemService implements OnInit {

	problem$: BehaviorSubject<any> = new BehaviorSubject(null);
	//problem$: AsyncSubject<any> = new AsyncSubject();

	constructor(private authService: AuthService,
				private tokenService: Angular2TokenService) {
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
		let url = 'vproblems/respide/' + id;
		return this.tokenService.get(url)
				   .pipe(map(res => res.json()));
	}

	submitProblem(language: any, code: string): void {
		let id, source;
		this.problem$
		    .subscribe(problem => {
				id = problem.id;
				source = problem.source;
			});
		let url, body;
		if (source == 'aio') {
			url = 'problems/submit/' + id;
		} else {
			url = 'vproblems/submit/' + id;
		} 

		body = {
			language: language,
			code: code,
			contest_id: 1
		};
		this.tokenService.post(url, body)
		    .pipe(map(res => res.json()));
	}

	getMySubmissions() :Observable<any> {
		let id;
		this.problem$
			.pipe(filter(x => x != null))
		    .subscribe(problem =>  id = problem.id);

		let user_name;
		this.authService.signedIn$
			.subscribe(user => user_name = user.user_name);

		let url = 'submission_records';
		let params = {
			search: {
				user_name: user_name,
				problem_id: id
			}
		}
		return this.tokenService.get(url, params)
				   .pipe(map(res => res.json()));	
	}

	getSubmissions() :Observable<any> {

		let id;
		this.problem$
		    .pipe(filter(x => x != null))
			.subscribe(problem => {
				id = problem.id;
			});
		let url = 'submission_records';
		let params = {
			search: {
				problem_id: id
			}
		}
		return this.tokenService.get(url, params)
				   .pipe(map(res => res.json()));	
	}
}
