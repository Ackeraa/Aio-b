import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, Observable, AsyncSubject } from 'rxjs';
import { map, filter, concatMap, mergeMap, switchMap } from 'rxjs/operators'; 
import { Angular2TokenService } from 'angular2-token';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { AuthService } from '../_services';

@Injectable({
	providedIn: 'root'
})
export class ProblemService implements OnInit {

	problem$: BehaviorSubject<any> = new BehaviorSubject(null);

	constructor(private authService: AuthService,
				private cableService: ActionCableService,
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

		let user_name, user_id;
		this.authService.signedIn$
			.pipe(filter(x => x != null))
			.subscribe(user => {
				user_id = user.user_id;
				user_name = user.user_name;
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
			contest_id: 1,
			user_id: user_id,
			user_name: user_name
		};
		this.tokenService.post(url, body)
		    .pipe(map(res => res.json()));
	}

	setMySubmissions() :Observable<any> {
		return this.problem$
			.pipe(
				filter(x => x != null),
				concatMap(() => this.authService.signedIn$
								    .pipe(filter(x => x != null)),
						 (x, y) => { return { problem: x, user: y } }),
			    switchMap(x => {
					let url = 'ws://127.0.0.1:3000/cable';
					let channel = 'SubmissionRecordsChannel';
					let params = { user_id: x.user.user_id,
								   problem_id: x.problem.id };

					return this.cableService
							   .cable(url)
							   .channel(channel, params)
							   .received()

				})
			);
	}

	getMySubmissions() :Observable<any> {
		return this.problem$
				   .pipe(
					   filter(x => x != null),
					   concatMap(() => this.authService.signedIn$
										   .pipe(filter(x => x != null)),
								 (x, y) => { return { problem: x, user: y } } ),
					   switchMap(x => {
						   let url = 'submission_records';
						   let params = { search: { user_name: x.user.user_name,
												    problem_id: x.problem.id } };
						   return this.tokenService.get(url, params)
									  .pipe(map(res => res.json()))	
						})
					);
	}

	setSubmissions(): Observable<any> {
		return this.problem$
		    .pipe(
				filter(x => x != null),
				switchMap(problem => {
					let url = 'ws://127.0.0.1:3000/cable';
					let channel = 'SubmissionRecordsChannel';
					let params = { problem_id: problem.id };
					return this.cableService
							   .cable(url)
							   .channel(channel, params)
							   .received()
					})
			);
	}

	getSubmissions() :Observable<any> {
		return this.problem$
		    .pipe(
				filter(x => x != null),
				switchMap(problem => {
					let url = 'submission_records';
					let params = { search: { problem_id: problem.id } };
					return this.tokenService.get(url, params)
							   .pipe(map(res => res.json()));
					})
			);
	}
}
