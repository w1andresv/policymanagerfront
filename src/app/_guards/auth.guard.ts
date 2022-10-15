import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';


@Injectable( { providedIn: 'root' } )
export class AuthGuard implements CanActivate {
    constructor( private router: Router,
                 private authenticationService: AuthenticationService ) {
    }

    async canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
        const logeado = this.authenticationService.isLogin();
        if ( logeado ) {
            return true;
        } else {
            localStorage.removeItem( 'Authorization' );
            this.router.navigate( [ '/auth/login' ] );
            return false;
        }
    }
}
