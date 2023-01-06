import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../_services/upload.service';

@Component( {
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: [ './upload.component.scss' ]
} )
export class UploadComponent implements OnInit {
    file: any;

    constructor( private uploadService: UploadService ) {
    }

    ngOnInit(): void {
    }


    myUploader( event: any ) {
        this.file = event.files[ 0 ];
        if ( this.file ) {
            this.uploadFile();
        }
    }

    uploadFile() {
        this.uploadFileToDrive( 'demos', this.file, '11-iwoFgW5W2UERtzB1khDe7gUKswpa4o' );
    }

    uploadFileToDrive( fileName: any, file: any, folderId: any ) {
        this.uploadService.subirArchivo( file, fileName, folderId ).then( ( res: any ) => {
            const response = JSON.parse( res );
            console.log( res );
        } ).catch( error => {
            console.log( error );
        } );
    }
}
