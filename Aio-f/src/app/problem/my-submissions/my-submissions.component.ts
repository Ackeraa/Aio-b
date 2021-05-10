import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { ProblemService } from '../problem.service';

@Component({
	selector: 'app-problem-my-submissions',
	templateUrl: './my-submissions.component.html',
	styleUrls: ['./my-submissions.component.scss']
})
export class MySubmissionsComponent implements OnInit {

	uri: string = 'submission_records';
	addition: string = 'public';
	loading: boolean;
	p: number;
	total: number;
	receiver: Subscription;
	submissions: Array<any>;

	constructor(private problemService: ProblemService) {
	}

	ngOnInit(): void {
		this.problemService.getMySubmissions()
			.pipe(filter(x => x != null))
			.subscribe(submissions => {
				this.submissions = submissions;
			});

		//only receive.
		this.receiver = this.problemService.getMySubmissionsChannel()
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
		this.problemService.getMySubmissionsPage(page)
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
