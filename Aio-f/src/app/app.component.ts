import { Component } from '@angular/core';
import { environment } from "../environments/environment";
import { Router } from '@angular/router';

import { User } from './users';
import {Angular2TokenService} from "angular2-token";

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent {
    currentUser: User;

	katexMarkdown =
		`#### \`katex\` directive example

	$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$`;
	constructor(
		private router: Router,
		private authToken: Angular2TokenService) {

			this.authToken.init(environment.token_auth_config);
		}
}

declare module "@angular/core" {
	interface ModuleWithProviders<T = any> {
		ngModule: Type<T>;
		providers?: Provider[];
	}
}
