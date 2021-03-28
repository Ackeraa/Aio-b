import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

const BASE_URL = 'http://127.0.0.1:3000';

@Component({
	selector: 'app-problem-description',
	templateUrl: './description.component.html',
	styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

	problem: any;

	constructor(private http: HttpClient) {
		this.getProblems();
	}

	getProblems(){
		let url = BASE_URL + '/problems/74';
		this.http.get(url).subscribe(data => {
			this.problem = data;
		});
	}

	ngOnInit(): void {
	}

}
