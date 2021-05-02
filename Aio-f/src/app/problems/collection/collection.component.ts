import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, Observable, fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap } from 'rxjs/operators'; 
import { Router } from '@angular/router';
import { SearchService } from '../search/search.service';

@Component({
	selector: 'app-problems-collection',
	templateUrl: './collection.component.html',
	styleUrls: ['./collection.component.scss']
})

export class CollectionComponent implements OnInit {

	loading: boolean;
	problems: any;
	p: number;
	total: number;

	constructor(private router: Router,
			    private searchService: SearchService) {
	}

	ngOnInit(): void {
	}

	setProblems(data: any): void {
		this.problems = data.problems;
		this.total = data.total;
		this.p = 1;
	}

	getPage(page: number): void {
		this.searchService.getPage(page)
			.subscribe(data => {
				this.problems = data.problems;
				this.total = data.total;
				this.p = page;
			});
	}

	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	viewProblem(source: string, id: string): void {
		let url: string;
		if (source == "aio") {
			url = "/problem/l/" + id;
		} else {
			url = "/problem/v/" + id;
		}
		this.router.navigate([url]);
	}
}
