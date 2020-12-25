import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
		private authTokenService:Angular2TokenService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authTokenService.userSignedIn()) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
