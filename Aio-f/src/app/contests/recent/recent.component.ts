import { Component, OnInit } from '@angular/core';
import { ContestsService } from '../contests.service';

@Component({
	selector: 'app-contests-recent',
	templateUrl: './recent.component.html',
	styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {

	which: string = 'contests';
	others: string = 'recent';
	loading: boolean;
	contests: Array<any>;
	p: number;
	total: number;

	constructor(private contestsService: ContestsService) {
	}

	ngOnInit(): void {
	}

	setContests(data: any): void {
		this.contests = data.contests;
		this.contests.map(contest => {
			let start_time = new Date(contest.start_time).getTime();
			let end_time = new Date(contest.end_time).getTime();
			contest.hours = (end_time - start_time) / 3600000;
			return contest;
		});
		this.total = data.total;
	}

	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	getPage(page: number): void {
		this.contestsService.getPage(page)
			.subscribe(data => {
				this.contests = data.contests;
				this.total = data.total;
				this.p = page;
			});
	}
}
