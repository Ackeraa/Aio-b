import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-discussion',
	templateUrl: './discussion.component.html',
	styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

	collection = [];
	p = 1;
	constructor() {
		for (let i = 1; i <= 100; i++) {
			this.collection.push(`item ${i}`);
		}
	}

	ngOnInit(): void {
	}

}
