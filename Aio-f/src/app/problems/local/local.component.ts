import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators'; 
import { Problem } from '../problem.model';

const BASE_URL = 'http://127.0.0.1:3000';

@Component({
	selector: 'app-problems-local',
	templateUrl: './local.component.html',
	styleUrls: ['./local.component.scss']
})
export class LocalComponent implements OnInit {

	problems: any;
	constructor(private http: HttpClient) {
		this.getProblems();
	}

	getProblems(): void {
		let url = BASE_URL + '/problems';
		this.http.get(url).subscribe(data => {
			this.problems = data;
		});
	}

	ngOnInit(): void {
	}

}
