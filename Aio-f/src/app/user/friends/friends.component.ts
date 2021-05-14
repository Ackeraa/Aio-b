import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators'; 
import { UserService } from '../user.service';

@Component({
	selector: 'app-user-friends',
	templateUrl: './friends.component.html',
	styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

	constructor(private userService: UserService) { }

	ngOnInit(): void {
	}

}
