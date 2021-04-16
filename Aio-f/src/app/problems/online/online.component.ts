import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, Observable, fromEvent } from 'rxjs';
import { OnlineService } from './online.service';
import { map, filter, debounceTime } from 'rxjs/operators'; 

@Component({
	selector: 'app-problems-online',
	templateUrl: './online.component.html',
	styleUrls: ['./online.component.scss']
})

export class OnlineComponent implements OnInit {

	loading: boolean;
	source: string;
	sources: Array<string>;
	problems: any;

	@ViewChild('vid', { static: true }) vid: ElementRef;
	@ViewChild('name', { static: true }) name: ElementRef;

	constructor(private onlineService: OnlineService) {
		this.loading = false;
		this.sources = ["Aio", "Codeforces", "UVA", "POJ", "Atcoder"];
		this.onlineService.search(this.sources[0], "", "");
		this.source = "codeforces";
	}

	ngOnInit(): void {
		//Observer of vid change.
		fromEvent(this.vid.nativeElement, 'keyup')
		.pipe(
			map((e: any) => e.target.value),
			filter((text: string) => text.length > 1),
			debounceTime(250),
			map((vid: string) => this.onlineService.search(
				this.source, vid, this.name.nativeElement.value)))
		.subscribe(obs => {
			obs.subscribe( problems => this.problems = problems);
		});

		//Observer of name change.
		fromEvent(this.name.nativeElement, 'keyup')
		.pipe(
			map((e: any) => e.target.value),
			filter((text: string) => text.length > 1),
			debounceTime(250),
			map((name: string) => this.onlineService.search(
				this.source, this.vid.nativeElement.value, name)))
		.subscribe(obs => {
			obs.subscribe( problems => this.problems = problems);
		});
	}

}
