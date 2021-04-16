import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProblemService } from './problem.service'; 

@Component({
	selector: 'app-problem',
	templateUrl: './problem.component.html',
	styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

	id: number;
	content: string;
	constructor(private route: ActivatedRoute,
			    private problemService: ProblemService) {
		problemService.id = this.route.snapshot.paramMap.get('id');
		this.route.queryParams.subscribe(params => {
			problemService.source = params['source'];
		});
	}

	ngOnInit(): void {
	}

}
