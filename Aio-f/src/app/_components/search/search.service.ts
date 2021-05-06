import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Subject, Observable } from 'rxjs';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators'; 

@Injectable({
	providedIn: 'root'
})
export class SearchService {

	query: string;

	constructor(private tokenService: Angular2TokenService) {
	}

	search(which: string, query: string, others: string): Observable<any> {
		this.query = query;
		let url = which + '/search';
		let params;
		if (others != '') {
			params = { search: { query: query, which: others } };
		} else {
			params = { search: { query: query } };
		}

		return this.tokenService.get(url, params)
			       .pipe(map(res => res.json()));
	}

	getPage(which: string, page: number): Observable<any> {
		let url = which + '/search';
		let params = { search: { query: this.query, page: page } };
		return this.tokenService.get(url, params)
			       .pipe(map(res => res.json()));
	}
}
