import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'; 
import { ContestService } from '../contest.service';

@Component({
	selector: 'app-contest-my-submissions',
	templateUrl: './my-submissions.component.html',
	styleUrls: ['./my-submissions.component.scss']
})
export class MySubmissionsComponent implements OnInit {

	receiver: Subscription;
	submissions: Array<any>;

	constructor(private contestService: ContestService) {
	}

	ngOnInit(): void {
		this.contestService.getMySubmissions()
			.pipe(filter(x => x != null))
			.subscribe(submissions => {
				this.submissions = submissions;
			});

		//only receive.
		this.receiver = this.contestService.getMySubmissionsChannel()
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
