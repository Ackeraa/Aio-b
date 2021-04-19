import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, Observable, fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap } from 'rxjs/operators'; 
import { Router } from '@angular/router';
import { CollectionService } from './collection.service';

@Component({
	selector: 'app-problems-collection',
	templateUrl: './collection.component.html',
	styleUrls: ['./collection.component.scss']
})

export class CollectionComponent implements OnInit {

	loading: boolean;
	sources: Array<string>;
	problems: any;

	@ViewChild('query', { static: true }) query: ElementRef;
	@ViewChild('source', { static: true }) source: ElementRef;

	constructor(private router: Router,
				private collectionService: CollectionService) {
	}

	ngOnInit(): void {

		this.loading = false;
		this.sources = ["Codeforces", "UVA", "POJ", "Atcoder"];
		this.collectionService.search(this.sources[0].toLowerCase(), "")
			.subscribe(problems => this.problems = problems);

		//Observer of source change.
		fromEvent(this.source.nativeElement, 'change')
		.pipe(
			map((e: any) => e.target.value.toLowerCase()),
			tap(() => this.loading = true),
			map((source: string) => this.collectionService.search(
						 source, this.query.nativeElement.value)))
		.subscribe(
			(obs: any) => {
				obs.subscribe( problems => this.problems = problems); 
				this.loading = false;
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
			debounceTime(250),
			tap(() => this.loading = true),
			map((query: string) => this.collectionService.search(
						this.source.nativeElement.value.toLowerCase(), query)),
			)
		.subscribe(
			(obs: any) => {
				this.loading = false;
				obs.subscribe( problems => this.problems = problems);
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
	reSpideProblems(): void {
		this.query.nativeElement.value = "";
		this.collectionService.reSpideProblems(this.source.nativeElement.value.toLowerCase)
			.subscribe(problems => this.problems = problems);
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
