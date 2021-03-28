import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Subject, Observable } from 'rxjs';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators'; 

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	constructor(private tokenService: Angular2TokenService) {
		
	}
	onSubmit():any {
		this.tokenService.get('problems').pipe(map(res => res.json())).subscribe(
			res =>      console.log(res),
			error =>    console.log(error)
		);
	}

	ngOnInit(): void {
	}

}
