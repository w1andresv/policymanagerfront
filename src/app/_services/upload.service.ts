import { AppSettings } from '../../proyect.conf';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';

@Injectable( {
    providedIn: 'root'
} )
export class UploadService {
    private urlServicios = AppSettings.serviceUrl + '/uploadfile/upload';

    constructor( private httpClient: HttpClient,
                 private authenticationService: AuthenticationService ) {

    }

    subirArchivo( archivo: File, fileName: any, idFolder: any ) {
        return new Promise( ( resolve, reject ) => {
            let formData: FormData = new FormData();
            let xhr = new XMLHttpRequest();
            formData.append( 'archivo', archivo );
            formData.append( 'nombre', fileName );
            formData.append( 'idFolder', idFolder );
            xhr.onreadystatechange = () => {
                if ( xhr.readyState === 4 ) {
                    if ( xhr.status === 200 ) {
                        resolve( xhr.response );
                    } else {
                        reject( xhr.response );
                    }
                }
            };
            xhr.open( 'POST', this.urlServicios, true );
            xhr.setRequestHeader( 'Authorization', this.authenticationService.obtenerToken() as string );
            xhr.send( formData );
        } );
    }
}
