import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Subject, Observable } from 'rxjs';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators'; 

@Injectable({
	providedIn: 'root'
})
export class OnlineService {

	constructor(private tokenService: Angular2TokenService ) {

	}

	search(source: string, vid: string, name: string): any {
		return this.tokenService.get(
			'/vproblems/search',
			{ search: { source: source, vid: vid, name: name } }
		).pipe(map(res => res.json()));
	}
}
