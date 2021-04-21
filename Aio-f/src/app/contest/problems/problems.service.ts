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

}
