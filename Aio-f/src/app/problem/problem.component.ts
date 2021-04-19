import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProblemService } from './problem.service'; 

@Component({
	selector: 'app-problem',
	templateUrl: './problem.component.html',
	styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

	constructor(private route: ActivatedRoute,
			    private problemService: ProblemService) {
	}

	ngOnInit(): void {
		let source = localStorage.getItem("source");
		let id = localStorage.getItem("id");
		this.problemService.getProblem(source, id);
	}
}
