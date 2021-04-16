import { Component, OnInit } from '@angular/core';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { ProblemService } from '../problem.service';

const BASE_URL = 'http://127.0.0.1:3000';

@Component({
	selector: 'app-problem-description',
	templateUrl: './description.component.html',
	styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

	problem: any;

	constructor(private problemService: ProblemService) {
		this.problemService.getProblem().subscribe(
			problem => {
				console.log(problem);
				this.problem = problem;
				console.log(problem.samples[0].sample_input[0]);
			}
		);
	}


	ngOnInit(): void {
	}

}
