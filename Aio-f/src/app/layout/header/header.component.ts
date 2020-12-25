import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services';
import { User } from '../../users';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    currentUser: any;

    constructor(private authService: AuthService) {

		this.authService.signedIn$.subscribe(
			x =>{
				if (x) this.currentUser = this.authService.getCurrentUser();
				else this.currentUser = null;
			}
		);
    }

    logOut() {
        this.authService.logOut().subscribe(
			() => this.currentUser = null
		);
    }

	ngOnInit(): void {
	}
}
