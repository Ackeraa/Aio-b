import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContestService } from './contest.service';

@Component({
	selector: 'app-contest',
	templateUrl: './contest.component.html',
	styleUrls: ['./contest.component.scss']
})
export class ContestComponent implements OnInit {


	constructor(private route: ActivatedRoute,
			    private contestService: ContestService) {
	}

	ngOnInit(): void {
		let id = this.route.snapshot.paramMap.get("id");
		this.contestService.getProblems(id);
	}

}
