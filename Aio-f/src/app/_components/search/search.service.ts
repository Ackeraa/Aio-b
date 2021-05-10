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
	uri: string;
	addition: string;

	constructor(private tokenService: Angular2TokenService) {
	}

	search(uri: string, query: string, addition: string): Observable<any> {
		this.uri = uri;
		this.query = query;
		this.addition = addition;

		let url = uri + '/search';
		let params;
		if (addition != '') {
			params = { search: { query: query, addition: addition } };
		} else {
			params = { search: { query: query } };
		}

		return this.tokenService.get(url, params)
			       .pipe(map(res => res.json()));
	}

	getPage(page: number): Observable<any> {
		let url = this.uri + '/search';
		let params;
		if (this.addition != '') {
			params = { search: { query: this.query, addition: this.addition, page: page } };
		} else {
			params = { search: { query: this.query, page: page } };
		}
		return this.tokenService.get(url, params)
			       .pipe(map(res => res.json()));
	}
}
