import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators'; 
import { Angular2TokenService } from 'angular2-token';

@Injectable({
	providedIn: 'root'
})
export class DiscussionService {

	constructor(private tokenService: Angular2TokenService) {
	}

	getComments(): Observable<any> {
		let url = 'comments';
		return this.tokenService.get(url)
			.pipe(map(res => res.json()));
	}
}
