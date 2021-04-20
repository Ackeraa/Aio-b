import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { filter, distinct } from 'rxjs/operators'; 
import { ProblemService } from '../problem.service';

@Component({
	selector: 'app-problem-my-submissions',
	templateUrl: './my-submissions.component.html',
	styleUrls: ['./my-submissions.component.scss']
})
export class MySubmissionsComponent implements OnInit {

	submissions$: Observable<any>;
	receiver: Subscription;
	judgings: Array<any>;

	constructor(private problemService: ProblemService) { }

	ngOnInit(): void {
		this.submissions$ = this.problemService.getMySubmissions();
		this.judgings = [];
		//only receive.
		this.receiver = this.problemService.setMySubmissions()
			.pipe(filter(x => x != null))
			.subscribe(message => {
				if (message.action === 'add') {
					this.judgings.push(message.data);
					console.log(this.judgings);
				} else if (message.action == 'update'){
					console.log("FUCK");
					console.log(this.judgings.filter(x => x.id === message.data));
				}
		});

	}
	ngOnDestroy(): void {
		this.receiver.unsubscribe();
	}
}
