import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators'; 
import { Angular2TokenService } from 'angular2-token';

@Injectable({
	providedIn: 'root'
})
export class CommentsService {

	constructor(private tokenService: Angular2TokenService) {
	}

	getComments(): Observable<any> {
		let url = 'comments';
		return this.tokenService.get(url)
			.pipe(map(res => res.json()));
	}

	voteUp(id: number): Observable<any> {
		let url = 'comments/vote_up';
		let body = { id: id };
		return this.tokenService.post(url, body);
	}

	voteDown(id: number): Observable<any> {
		let url = 'comments/vote_down';
		let body = { id: id };
		return this.tokenService.post(url, body);
	}

	create(parent_id: number, which: string, description: string): Observable<any> {
		let url = 'comments';
		let body;
		if (parent_id == 0) {
			body = { which: which, description: description };
		} else {
			body = { parent_id: parent_id, which: which, description: description };
		}
		return this.tokenService.post(url, body)
			.pipe(map(res => res.json()));
	}
}
