import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { ProblemService } from '../problem.service';
import { ActionCableService, Channel } from 'angular2-actioncable';

@Component({
	selector: 'app-problem-submissions',
	templateUrl: './submissions.component.html',
	styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {

	receiver: Subscription;
	submissions: any;

	constructor(private problemService: ProblemService) {
	}

	ngOnInit(): void {
		this.problemService.getSubmissions()
			.subscribe(submissions => {
				this.submissions = submissions;
			});

		//only receive.
		this.receiver = this.problemService.getSubmissionsChannel()
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

	ngOnDestroy(): void {
		this.receiver.unsubscribe();
	}

}
