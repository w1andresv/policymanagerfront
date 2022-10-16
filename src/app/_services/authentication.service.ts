import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppSettings } from '../../proyect.conf';
import { map } from 'rxjs/operators';

@Injectable( {
    providedIn: 'root'
} )
export class AuthenticationService {
    public token!: string;
    public usuarioLogueado: any;
    private urlServicios = AppSettings.serviceUrl + '/auth';
    private currentUserSubject!: BehaviorSubject<any>;
    private jwtHelper: JwtHelperService = new JwtHelperService();

    constructor( private httpClient: HttpClient ) {

    }


    login( data: any ) {
        return this.httpClient.post( this.urlServicios, data ).pipe( map( res => res as any ) );
    }

    logout() {
        localStorage.removeItem( 'Authorization' );
        this.currentUserSubject.next( null );
    }

    isLogin() {
        const token = localStorage.getItem( 'Authorization' );
        if ( !token ) {
            return false;
        } else {
            return !this.jwtHelper.isTokenExpired( token );
        }
    }

    obtenerToken() {
        return localStorage.getItem( 'Authorization' );
    }

    obtenerUsuario() {
        const token = localStorage.getItem( 'Authorization' );
        if ( token !== null ) {
            const decoded = this.jwtHelper.decodeToken( token );
            this.usuarioLogueado = decoded.usuario;
        } else {
            localStorage.removeItem( 'Authorization' );
            this.usuarioLogueado = null;
        }
        return this.usuarioLogueado;
    }

    obtenerIdUsuarioLogeado() {
        const token = localStorage.getItem( 'Authorization' );
        if ( token !== null ) {
            const decoded = this.jwtHelper.decodeToken( token );
            this.usuarioLogueado = decoded.usuario;
            return this.usuarioLogueado._id;
        } else {
            return null;
        }
    }
}
