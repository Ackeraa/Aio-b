import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators'; 
import { Angular2TokenService } from 'angular2-token';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { AuthService } from '../_services';
import { ProblemSearchService } from '../_components';

@Injectable({
	providedIn: 'root'
})
export class ContestService implements OnInit {

	id: string;
	problems$: BehaviorSubject<any> = new BehaviorSubject(null);
	contest$: BehaviorSubject<any> = new BehaviorSubject(null);

	constructor(private authService: AuthService,
				private cableService: ActionCableService,
				private tokenService: Angular2TokenService,
			    private problemSearchService: ProblemSearchService) {
	}

	ngOnInit() {
	}

	getData(id: string): void {
		this.id = id;
		let url = 'contests/' + id + '/problems';
		this.tokenService.get(url)
		    .pipe(map(res => res.json()))
			.subscribe(data => {
				this.contest$.next(data.contest);
				this.problems$.next(data.problems);
			});
	}

	getPage(page: number): Observable<any> {
		return this.problemSearchService.getPage(page);
	}

	addProblem(problem_id: string): void {
		let url = 'contests/' + this.id + '/add_problem/' + problem_id;
		this.tokenService.get(url)
		    .pipe(map(res => res.json()))
			.subscribe(problems => {
				this.problems$.next(problems);
			});
	}

	deleteProblem(problem_id: string): void {
		let url = 'contests/' + this.id + '/delete_problem/' + problem_id;
		this.tokenService.get(url)
		    .pipe(map(res => res.json()))
			.subscribe(problems => {
				this.problems$.next(problems);
			});
	}

	submitProblem(index: number, language: any, code: string): Observable<any> {
		return combineLatest(this.problems$, this.authService.signedIn$)
			.pipe(
				filter(([x, y]) => x != null && y != null),
			    switchMap(([problems, user]) => {
					let url, body;
					if (problems[index].source == 'aio') {
						url = 'problems/' + problems[index].id + '/submit';
					} else {
						url = 'vproblems/' + problems[index].id + '/submit';
					} 
					body = {
						language: language,
						code: code,
						contest_id: this.id,
						user_id: user.user_id,
						user_name: user.user_name,
						contest_problem_id: index
					};
					return this.tokenService.post(url, body)
						.pipe(map(res => res.json()));
				})
			);
	}

	getRanks(): Observable<any> {
		return this.problems$
		    .pipe(
				filter(x => x != null),
				switchMap(() => {
					let url = 'acm_contest_ranks/get_contest_rank';
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

	getRanksChannel(): Observable<any> {
		return this.problems$
		    .pipe(
				filter(x => x != null),
				switchMap(() => {
					let url = 'ws://127.0.0.1:3000/cable';
					let channel = 'RanksChannel';
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
}
