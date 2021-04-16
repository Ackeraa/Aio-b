import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
	providedIn: 'root'
})
export class ProblemService {

	id: string;
	source: string;
	constructor(private tokenService: Angular2TokenService) {
	}

	getProblem(): Observable<any> {
		let url: string;
		if (this.source === 'aio') {
			url = 'problems/' + this.id;
		} else {
			url = 'vproblems/' + this.id;
		}
		return this.tokenService.get(url)
		           .pipe(map(res => res.json()));
	}

	updateProblem(source: string, id: string): Observable<any> {
		return this.tokenService.get("vproblems/update/" + id)
								.pipe(map(res => res.json()));
	}
}
