import { Component } from '@angular/core';
import { environment } from "../environments/environment";
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './users';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent {
    currentUser: User;

    constructor(
		private router: Router,
        private authenticationService: AuthenticationService) {

        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
