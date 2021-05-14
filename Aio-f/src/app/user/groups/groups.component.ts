import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators'; 
import { UserService } from '../user.service';

@Component({
	selector: 'app-user-groups',
	templateUrl: './groups.component.html',
	styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

	constructor(private userService: UserService) { }

	ngOnInit(): void {
	}

}
