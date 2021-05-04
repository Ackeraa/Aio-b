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
