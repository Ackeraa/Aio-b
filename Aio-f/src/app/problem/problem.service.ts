import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
	providedIn: 'root'
})
export class ProblemService {

	problem$: BehaviorSubject<any> = new BehaviorSubject(null);

	constructor(private tokenService: Angular2TokenService) {

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

	reSpideProblem(id: string): Observable<any> {
		return this.tokenService.get("vproblems/respide/" + id)
								.pipe(map(res => res.json()));
	}

	submitProblem(): void {

	}
}
