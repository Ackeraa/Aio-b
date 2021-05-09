import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../problem.service';

@Component({
	selector: 'app-problem-discussion',
	templateUrl: './discussion.component.html',
	styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

	which: string;

	constructor(private problemService: ProblemService) { }

	ngOnInit(): void {
		this.problemService.problem$.subscribe(problem => {
			this.which = 'problem_' + problem.id;
		});
	}

}
