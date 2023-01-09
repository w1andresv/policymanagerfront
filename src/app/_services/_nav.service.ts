import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable( {
    providedIn: 'root'
} )
export class NavService {

    constructor() {
    }

    alert( tipo: any, titulo?: any ) {
        let title: string | undefined = undefined;
        let icon: any;
        let cargando: boolean;
        const time = 1500;
        switch ( tipo ) {
            case 1:
                title = title ? title : 'Guardado exitoso';
                icon = 'success';
                setTimeout( () => {
                    this.closeAlert();
                }, time );
                cargando = false;
                break;
            case 2:
                title = title ? title : 'Actualización exitosa';
                icon = 'success';
                setTimeout( () => {
                    this.closeAlert();
                }, time );
                cargando = false;
                break;
            case 3:
                title = title ? title : 'Ha ocurrido un error';
                icon = 'error';
                setTimeout( () => {
                    this.closeAlert();
                }, time );
                cargando = false;
                break;
            case 4:
                title = title ? title : 'Acción realizada con exito!';
                icon = 'success';
                setTimeout( () => {
                    this.closeAlert();
                }, time );
                cargando = false;
                break;
            case 0:
                title = titulo;
                icon = 'info';
                setTimeout( () => {
                    this.closeAlert();
                }, time );
                cargando = false;
                break;
            default:
                title = '';
                cargando = false;
                setTimeout( () => {
                    this.closeAlert();
                }, time );
        }
        swal.fire( {
            title,
            icon,
            allowEscapeKey: true,
            allowOutsideClick: false,
            showConfirmButton: false,
        } );
    }

    closeAlert() {
        swal.close();
    }

    toast( type: any, mesage?: any ) {
        let title: string;
        let icon: any;
        const timer = 3000;
        switch ( type ) {
            case 1:
                title = mesage ? mesage : 'Guardado exitoso';
                icon = 'success';
                break;
            case 2:
                title = mesage ? mesage : 'Actualización exitosa';
                icon = 'success';
                break;
            case 3:
                title = mesage ? mesage : 'Ha ocurrido un error';
                icon = 'error';
                break
            case 4:
                title = mesage ? mesage : 'Acción realizada con exito!';
                icon = 'success';
                break;
            case 0:
                title = mesage;
                icon = 'info';
                break;
            default:
                title = 'Policy manager';
                icon = 'info';
        }
        const data = swal.mixin( {
            toast: true,
            
            position: 'top',
            showConfirmButton: false,
            timer,
            timerProgressBar: true,
            didOpen: ( toast ) => {
                // toast.addEventListener( 'mouseenter', swal.stopTimer );
                // toast.addEventListener( 'mouseleave', swal.resumeTimer );
            }
        } );
        data.fire( {
            title,
            icon,
            allowEscapeKey: true,
            allowOutsideClick: false,
            showConfirmButton: false,
        } );
    }


}
