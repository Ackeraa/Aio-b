import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, Observable, fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap } from 'rxjs/operators'; 
import { Router } from '@angular/router';
import { ContestService } from '../contest.service';

@Component({
	selector: 'app-contest-problems',
	templateUrl: './problems.component.html',
	styleUrls: ['./problems.component.scss']
})
export class ProblemsComponent implements OnInit {

	loading: boolean;
	allProblems: any;
	problems: Array<any>;

	constructor(private router: Router,
			    private contestService: ContestService) {
	}

	ngOnInit(): void {
		this.problems = [];
		this.contestService.problems$
			.subscribe(problems => this.problems = problems);
	}

	setAllProblems(problems: any): void {
		this.allProblems = problems;
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

	isAdded(id: string): boolean {
		return this.problems.filter(x => x.id === id).length > 0;
	}

	addProblem(id: string): void {
		this.contestService.addProblem(id);
	}

	deleteProblem(id: string): void {
		this.contestService.deleteProblem(id);
	}

}
