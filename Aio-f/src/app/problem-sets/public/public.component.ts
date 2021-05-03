import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, Observable, fromEvent } from 'rxjs';
import { map, filter, switchAll, debounceTime, tap } from 'rxjs/operators'; 
import { ProblemSetsService } from '../problem-sets.service';

@Component({
	selector: 'app-public',
	templateUrl: './public.component.html',
	styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

	@ViewChild('query', { static: true }) query: ElementRef;

	loading: boolean;
	problemSets: Array<any>;
	p: number;
	total: number;

	constructor(private problemSetsService: ProblemSetsService) { }

	ngOnInit(): void {
		this.problemSetsService.search('public', '')
		.pipe(tap(() => this.loading = true))
		.subscribe(
			(data: any) => {
				this.loading = false;
				this.problemSets = data;
			},
			(err: any) => {
				this.loading = false;
				console.log(err);
			},
			() => {
				this.loading = false;
			}
		);
		//Observer of query change.
		fromEvent(this.query.nativeElement, 'keyup')
		.pipe(
			map((e: any) => e.target.value),
			debounceTime(300),
			tap(() => this.loading = true),
			map((query: string) => this.problemSetsService.search('public', query)),
			switchAll()
		)
		.subscribe(
			(data: any) => {
				this.loading = false;
				this.problemSets = data;
			},
			(err: any) => {
				this.loading = false;
				console.log(err);
			},
			() => {
				this.loading = false;
			}
		);
	}

	getPage(page: number): void {
		this.problemSetsService.getPage('public', page)
			.subscribe(data => {
				this.problemSets = data.problemSets;
				this.total = data.total;
				this.p = page;
			});
	}

}
