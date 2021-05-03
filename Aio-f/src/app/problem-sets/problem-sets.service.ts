import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { Angular2TokenService } from 'angular2-token';

@Injectable({
	providedIn: 'root'
})
export class ProblemSetsService {

	query: string;

	constructor(private tokenService: Angular2TokenService) {
	}

	search(which: string, query: string): Observable<any> {
		this.query = query;
		let url = 'problem_sets/search';
		let params;
		if (query === '') {
			params = { search: { which: which, page: 1 } };
		} else {
			params = { search: { which: which, query: query, page: 1 } };
		}
		return this.tokenService.get(url, params)
		    .pipe(map(res => res.json()));
	}

	getPage(which: string, page: number): Observable<any> {
		let url = 'problem_sets/search';
		let params;
		if (this.query === '') {
			params = { search: { which: which, page: page } };
		} else {
			params = { search: { which: which, query: this.query, page: page } };
		}
		return this.tokenService.get(url, params)
		    .pipe(map(res => res.json()));
	}

	create(data: any): Observable<any> {
		let url = 'problem_sets';
		return this.tokenService.post(url, data);
	}
}
