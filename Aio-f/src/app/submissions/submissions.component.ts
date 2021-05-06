import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { ActionCableService, Channel } from 'angular2-actioncable';
import { SubmissionsService } from './submissions.service';

@Component({
	selector: 'app-submissions',
	templateUrl: './submissions.component.html',
	styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {

	which: string = 'submission_records';
	others: string = 'public';
	loading: boolean;
	p: number;
	total: number;
	receiver: Subscription;
	submissions: Array<any>;

	constructor(private submissionsService: SubmissionsService) {
	}

	ngOnInit(): void {
		this.submissionsService.getSubmissions()
			.subscribe(submissions => {
				this.submissions = submissions;
			});

		//only receive.
		this.receiver = this.submissionsService.getSubmissionsChannel()
			.pipe(filter(x => x != null))
			.subscribe(submission => {
				let i = this.submissions.findIndex(x => x.id === submission.id);
				if (i == -1) {
					this.submissions.push(submission);
				} else {
					this.submissions[i] = submission;
				}
			});
	}

	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	setSubmissions(data: any): void {
		this.submissions = data.submission_records;
		this.total = data.total;
	}

	getPage(page: number): void {
		this.submissionsService.getSubmissionsPage(page)
			.subscribe(data => {
				this.submissions = data.submission_records;
				this.total = data.total;
				this.p = page;
				console.log(this.p);
			});
	}
	ngOnDestroy(): void {
		this.receiver.unsubscribe();
	}

}
