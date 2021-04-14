import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
	selector: 'app-problem',
	templateUrl: './problem.component.html',
	styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

	id: string;
	content: string;
	constructor(private route: ActivatedRoute) {
		this.id = this.route.snapshot.paramMap.get('id');
		console.log(this.id);
	}

	ngOnInit(): void {
	}

}
