import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { Router } from '@angular/router';

@Component( {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [ `
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    ` ],
    styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent implements OnInit {

    formulario!: FormGroup;
    type = 'password';
    loading: boolean = false;

    constructor( public layoutService: LayoutService,
                 private router: Router,
                 private authenticationService: AuthenticationService,
                 private formBuilder: FormBuilder ) {
    }

    get f() {
        return this.formulario.controls;
    }

    ngOnInit(): void {
        const token = localStorage.getItem( 'Authorization' );
        if ( token !== null ) {
            this.router.navigate( [ '/' ] );
        } else {
            this.loadForm();
        }
    }

    loadForm() {
        this.formulario = this.formBuilder.group( {
            username: [ null, [ Validators.required ] ],
            password: [ null, [ Validators.required ] ]
        } );
    }

    onSubmit() {
        this.markAllDirty( this.formulario.controls as any );
        if ( this.formulario.valid ) {
            const value = this.formulario.value;
            this.authenticationService.login( value ).subscribe( res => {
                if ( res.estado ) {
                    localStorage.setItem( 'Authorization', res.token );
                    // this.appmain.setSession( true );
                    this.router.navigate( [ '/' ] );
                    this.loading = false;
                } else {
                    // this.messageService.add( { severity: 'error', summary: 'Error', detail: 'Usuario y/o contraseña incorectos' } );
                    localStorage.removeItem( 'Authorization' );
                    // this.appmain.setSession( false );
                    this.loading = false;
                }
            } );
            console.log( value );
        }

    }

    change() {
        if ( this.type === 'password' ) {
            this.type = 'text';
        } else {
            this.type = 'password';
        }
    }

    private markAllDirty( event: any ) {
        const keys = Object.keys( event );
        keys.map( x => {
            event[ x ].markAsDirty();
        } );

    }
}
