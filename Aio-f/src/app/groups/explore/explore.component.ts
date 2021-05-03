import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, Observable, fromEvent } from 'rxjs';
import { map, filter, switchAll, debounceTime, tap } from 'rxjs/operators'; 
import { GroupsService } from '../groups.service';

@Component({
	selector: 'app-explore',
	templateUrl: './explore.component.html',
	styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

	groups: Array<any>;
	loading: boolean;
	p: number;
	total: number;
	@ViewChild('query', { static: true }) query: ElementRef;

	constructor(private groupsService: GroupsService) {
	}

	ngOnInit(): void {
		this.groupsService.search('')
		.subscribe(
			(data: any) => {
				this.loading = false;
				this.groups = data.groups;
				this.total = data.total;
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
			map((query: string) => this.groupsService.search(query)),
			switchAll()
		)
		.subscribe(
			(data: any) => {
				this.loading = false;
				this.groups = data.groups;
				this.total = data.total;
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
		this.groupsService.getPage(page)
			.subscribe(data => {
				this.groups = data.groups;
				this.total = data.total;
				this.p = page;
			});
	}

}
