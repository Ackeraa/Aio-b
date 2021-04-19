import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../problem.service';

@Component({
	selector: 'app-problem-my-submissions',
	templateUrl: './my-submissions.component.html',
	styleUrls: ['./my-submissions.component.scss']
})
export class MySubmissionsComponent implements OnInit {

	submissions: any;

	constructor(private problemService: ProblemService) { }

	ngOnInit(): void {
		this.problemService.getMySubmissions()
		    .subscribe(submissions => {
				this.submissions = submissions;
			});
	}
}
