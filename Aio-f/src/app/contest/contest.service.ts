import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators'; 
import { Angular2TokenService } from 'angular2-token';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { AuthService } from '../_services';

@Injectable({
	providedIn: 'root'
})
export class ContestService implements OnInit {

	id: string;
	problems$: BehaviorSubject<any> = new BehaviorSubject(null);

	constructor(private authService: AuthService,
				private cableService: ActionCableService,
				private tokenService: Angular2TokenService) {
	}

	ngOnInit() {
	}

	getProblems(id: string): void {
		this.id = id;
		let url = '/contests/' + id;
		this.tokenService.get(url)
		    .pipe(map(res => res.json()))
			.subscribe(problems => {
				this.problems$.next(problems);
			});
	}

	submitProblem(problem: any, language: any, code: string): Observable<any> {
		return combineLatest(this.problems$, this.authService.signedIn$)
			.pipe(
				filter(([x, y]) => x != null && y != null),
			    switchMap(([x, user]) => {
					let url, body;
					if (problem.source == 'aio') {
						url = 'problems/submit/' + problem.id;
					} else {
						url = 'vproblems/submit/' + problem.id;
					} 
					body = {
						language: language,
						code: code,
						contest_id: this.id,
						user_id: user.user_id,
						user_name: user.user_name
					};
					return this.tokenService.post(url, body)
						.pipe(map(res => res.json()));
				})
			);
	}

	getMySubmissionsChannel() :Observable<any> {
		return combineLatest(this.problems$, this.authService.signedIn$)
			.pipe(
				filter(([x, y]) => x != null && y != null),
			    switchMap(([x, user]) => {
					let url = 'ws://127.0.0.1:3000/cable';
					let channel = 'SubmissionRecordsChannel';
					let params = {
						contest_id: this.id,
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
		return combineLatest(this.problems$, this.authService.signedIn$)
			.pipe(
				filter(([x, y]) => x != null && y != null),
				switchMap(([x, user]) => {
					let url = 'submission_records';
					let params = {
						search: {
							contest_id: this.id,
							user_name: user.user_name
						}
					};
					return this.tokenService.get(url, params)
					   .pipe(map(res => res.json()))	
					})
			);
	}

	getSubmissionsChannel(): Observable<any> {
		return this.problems$
		    .pipe(
				filter(x => x != null),
				switchMap(() => {
					let url = 'ws://127.0.0.1:3000/cable';
					let channel = 'SubmissionRecordsChannel';
					let params = {
						contest_id: this.id
					};
					return this.cableService
					   .cable(url)
					   .channel(channel, params)
					   .received()
					})
			);
	}

	getSubmissions() :Observable<any> {
		return this.problems$
		    .pipe(
				filter(x => x != null),
				switchMap(() => {
					let url = 'submission_records';
					let params = {
						search: {
							contest_id: this.id
						}
					};
					return this.tokenService.get(url, params)
					   .pipe(map(res => res.json()));
					})
			);
	}
}
