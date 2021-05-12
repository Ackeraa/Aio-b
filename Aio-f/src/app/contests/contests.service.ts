import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { Angular2TokenService } from 'angular2-token';
import { SearchService } from '../_services';

@Injectable({
	providedIn: 'root'
})
export class ContestsService {

	constructor(private searchService: SearchService,
				private tokenService: Angular2TokenService) {
	}

	getPage(page: number): Observable<any> {
		return this.searchService.getPage(page);
	}

	create(data: any): Observable<any> {
		let url = 'contests';
		return this.tokenService.post(url, data)
			.pipe(map(res => res.json()));
	}
}
