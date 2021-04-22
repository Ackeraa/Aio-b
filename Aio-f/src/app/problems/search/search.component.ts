import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Subject, Observable, fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap } from 'rxjs/operators'; 
import { Router } from '@angular/router';
import { SearchService } from './search.service';

@Component({
	selector: 'app-problems-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	sources: Array<string>;

	@Output() problemsEvent = new EventEmitter<any>();
	@Output() loadingEvent = new EventEmitter<boolean>();
	@ViewChild('query', { static: true }) query: ElementRef;
	@ViewChild('source', { static: true }) source: ElementRef;

	constructor(private router: Router,
				private searchService: SearchService) {
	}

	ngOnInit(): void {

		this.loadingEvent.emit(false);
		this.sources = ["Codeforces", "UVA", "POJ", "Atcoder"];
		this.searchService.search(this.sources[0].toLowerCase(), "")
			.subscribe(problems => this.problemsEvent.emit(problems));

		//Observer of source change.
		fromEvent(this.source.nativeElement, 'change')
		.pipe(
			map((e: any) => e.target.value.toLowerCase()),
			tap(() => this.loadingEvent.emit(true)),
			map((source: string) => this.searchService.search(
						 source, this.query.nativeElement.value)))
		.subscribe(
			(obs: any) => {
				obs.subscribe(problems => this.problemsEvent.emit(problems)); 
				this.loadingEvent.emit(false);
			},
			(err: any) => {
				this.loadingEvent.emit(false);
				console.log(err);
			},
			() => {
				this.loadingEvent.emit(false);
			}
		);

		//Observer of query change.
		fromEvent(this.query.nativeElement, 'keyup')
		.pipe(
			map((e: any) => e.target.value),
			debounceTime(250),
			tap(() => this.loadingEvent.emit(true)),
			map((query: string) => this.searchService.search(
						this.source.nativeElement.value.toLowerCase(), query)),
			)
		.subscribe(
			(obs: any) => {
				this.loadingEvent.emit(false);
				obs.subscribe( problems => this.problemsEvent.emit(problems));
			},
			(err: any) => {
				this.loadingEvent.emit(false);
				console.log(err);
			},
			() => {
				this.loadingEvent.emit(false);
			}
		);
	}

	reSpideProblems(): void {
		this.query.nativeElement.value = "";
		this.searchService.reSpideProblems(this.source.nativeElement.value.toLowerCase)
			.subscribe(problems => this.problemsEvent.emit(problems));
	}

}