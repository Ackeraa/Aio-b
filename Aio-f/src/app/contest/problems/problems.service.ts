import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Subject, Observable } from 'rxjs';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators'; 

@Injectable({
	providedIn: 'root'
})
export class ProblemsService {
	constructor(private tokenService: Angular2TokenService) {
	}

	search(source: string, query: string): Observable<any> {
		let url: string;
		let params: any;

		if (query === "") {
			params = { search: { source: source } };
		} else {
			params = { search: { source: source, query: query } };
		}
		if (source === 'aio'){
			url = 'problems/search';
		} else {
			url = 'vproblems/search';
		}
		return this.tokenService.get(url, params)
		.pipe(map(res => res.json()));
	}

	reSpideProblems(source: string): Observable<any> {
		let url = 'vproblems/respides';
		return this.tokenService.get(
					"vproblems/respides",
					{ search: { source: source } }
				).pipe(map(res => res.json()));
	}
}
