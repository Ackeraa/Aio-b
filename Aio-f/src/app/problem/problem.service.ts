import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators'; 
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
						user_id: user.user_id,
						user_name: user.user_name
					};
					return this.tokenService.post(url, body)
						.pipe(map(res => res.json()));
				})
			);
	}

	getMySubmissionsChannel() :Observable<any> {

		return combineLatest(this.problem$, this.authService.signedIn$)
			.pipe(
				filter(([x, y]) => x != null && y != null),
			    switchMap(([problem, user]) => {
					let url = 'ws://127.0.0.1:3000/cable';
					let channel = 'SubmissionRecordsChannel';
					let params = {
						problem_id: problem.id,
						user_id: user.user_id
					};
					return this.cableService
							   .cable(url)
							   .channel(channel, params)
							   .received()
				})
			);
	}

	getMySubmissions() :Observable<any> {
		return combineLatest(this.problem$, this.authService.signedIn$)
			.pipe(
			   filter(([x, y]) => x != null && y != null),
			   switchMap(([problem, user]) => {
				   let url = 'submission_records';
				   let params = {
					   search: {
						   user_name: user.user_name,
						   problem_id: problem.id
					   }
				   };
				   return this.tokenService.get(url, params)
							  .pipe(map(res => res.json()))	
				})
			);
	}

	getSubmissionsChannel(): Observable<any> {
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
