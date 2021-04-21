import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, Observable, AsyncSubject } from 'rxjs';
import { map, filter, concatMap, mergeMap, switchMap } from 'rxjs/operators'; 
import { Angular2TokenService } from 'angular2-token';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { AuthService } from '../_services';

@Injectable({
	providedIn: 'root'
})
export class ContestService implements OnInit {

	problem$: BehaviorSubject<any> = new BehaviorSubject(null);
	problems$: BehaviorSubject<any> = new BehaviorSubject(null);

	constructor(private authService: AuthService,
				private cableService: ActionCableService,
				private tokenService: Angular2TokenService) {
	}

	ngOnInit() {
	}

	getProblems(id: string): void {
		let url = '/contests/' + id;
		this.tokenService.get(url)
		    .pipe(map(res => res.json()))
			.subscribe(problems => {
				this.problems$.next(problems);
			});
	}

	submitProblem(id: string, language: any, code: string): Observable<any> {
		return this.problem$
			.pipe(
				filter(x => x != null),
				concatMap(() => this.authService.signedIn$
								    .pipe(filter(x => x != null)),
						 (x, y) => { return { problem: x, user: y } }),
			    switchMap(x => {
					let url, body;
					if (x.problem.source == 'aio') {
						url = 'problems/submit/' + x.problem.id;
					} else {
						url = 'vproblems/submit/' + x.problem.id;
					} 
					body = {
						language: language,
						code: code,
						contest_id: 1,
						user_id: x.user.user_id,
						user_name: x.user.user_name
					};
					return this.tokenService.post(url, body)
						.pipe(map(res => res.json()));
				})
			);
	}

	getMySubmissionsChannel() :Observable<any> {
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
