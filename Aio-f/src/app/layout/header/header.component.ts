import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services';
import { User } from '../../users';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    currentUser: User;

    constructor(
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
    }

	ngOnInit(): void {
	}
}
