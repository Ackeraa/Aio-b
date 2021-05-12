import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators'; 
import { Angular2TokenService } from 'angular2-token';
import { ProblemSearchService } from '../_services';

@Injectable({
	providedIn: 'root'
})
export class ProblemsService {

	constructor(private tokenService: Angular2TokenService,
				private ProblemSearchService: ProblemSearchService) {
			}
	
	getPage(page: number): Observable<any> {
		return this.ProblemSearchService.getPage(page);
	}
}
