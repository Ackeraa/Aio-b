import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    currentUser: any;

    constructor(public authService: AuthService) {
    }

    logOut() {
        this.authService.logOut().subscribe(
			() => this.currentUser = null
		);
    }

	ngOnInit(): void {
		this.authService.signedIn$.subscribe(data => {
			if (data) this.currentUser = data;
			else this.currentUser = null;
		});
	}
	ngOnDestroy(): void {
	}
}
