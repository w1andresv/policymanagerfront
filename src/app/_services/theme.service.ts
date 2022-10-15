import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../proyect.conf';
import { map } from 'rxjs/operators';

@Injectable( {
    providedIn: 'root'
} )
export class ThemeService {
    private urlServicios = AppSettings.serviceUrl + '/theme';

    constructor( private httpClient: HttpClient ) {

    }


    setTheme( data: any ) {
        return this.httpClient.post( this.urlServicios, data ).pipe( map( res => res as any ) );
    }
    updateTheme( data: any ) {
        return this.httpClient.put( this.urlServicios, data ).pipe( map( res => res as any ) );
    }

    getTheme() {
        return this.httpClient.get( this.urlServicios ).pipe( map( res => res as any ) );
    }
}
