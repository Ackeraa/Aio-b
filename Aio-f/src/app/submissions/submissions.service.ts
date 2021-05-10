import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { Angular2TokenService } from 'angular2-token';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { SearchService } from '../_components';

@Injectable({
	providedIn: 'root'
})
export class SubmissionsService {

	constructor(private searchService: SearchService,
				private cableService: ActionCableService,
				private tokenService: Angular2TokenService){
	}

	getSubmissionsChannel(): Observable<any> {
		let url = 'ws://127.0.0.1:3000/cable';
		let channel = 'SubmissionRecordsChannel';
		return this.cableService
		   .cable(url)
		   .channel(channel)
		   .received();
	}

	getSubmissions() :Observable<any> {
		let url = 'submission_records';
		return this.tokenService.get(url)
		   .pipe(map(res => res.json()));
	}

	getSubmissionsPage(page: number) :Observable<any> {
		return this.searchService.getPage(page);
	}
}
