import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../problem.service';

@Component({
	selector: 'app-problem-submissions',
	templateUrl: './submissions.component.html',
	styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {

	submissions: any;

	constructor(private problemService: ProblemService) { }

	ngOnInit(): void {
		this.problemService.getSubmissions()
		    .subscribe(submissions => {
				this.submissions = submissions;
			});
	}

}
