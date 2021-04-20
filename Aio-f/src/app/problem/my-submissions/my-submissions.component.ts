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
	pendings: Array<any>;

	constructor(private problemService: ProblemService) { }

	ngOnInit(): void {
		this.submissions$ = this.problemService.getMySubmissions();
		this.pendings = [];
		//only receive.
		this.receiver = this.problemService.setMySubmissions()
			.pipe(filter(x => x != null))
			.subscribe(message => {
				if (message.action === 'add') {
					this.pendings.push(message.data);
					console.log(this.pendings);
				} else if (message.action == 'update'){
			}
		});

	}
	ngOnDestroy(): void {
		this.receiver.unsubscribe();
	}
}
