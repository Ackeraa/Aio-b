import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, Observable, fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap } from 'rxjs/operators'; 
import { Router } from '@angular/router';

@Component({
	selector: 'app-problems-collection',
	templateUrl: './collection.component.html',
	styleUrls: ['./collection.component.scss']
})

export class CollectionComponent implements OnInit {

	loading: boolean;
	problems: any;

	constructor(private router: Router) {
	}

	ngOnInit(): void {
	}

	setProblems(problems: any): void {
		this.problems = problems;
	}

	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	getProblem(source: string, id: string): void {
		let url: string;
		if (source == "aio") {
			url = "/problem/l/" + id;
		} else {
			url = "/problem/v/" + id;
		}
		this.router.navigate([url]);
	}
}
