import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { Angular2TokenService } from 'angular2-token';

@Injectable({
	providedIn: 'root'
})
export class GroupsService {

	query: string;

	constructor(private tokenService: Angular2TokenService) {
	}

	search(query: string): Observable<any> {
		this.query = query;
		let url = 'groups/search';
		let params = { search: { query: query, page: 1 } };
		return this.tokenService.get(url, params)
		    .pipe(map(res => res.json()));
	}

	getPage(page: number): Observable<any> {
		let url = 'groups/search';
		let params = { search: { query: this.query, page: page } };
		return this.tokenService.get(url, params)
		    .pipe(map(res => res.json()));
	}
}
