import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component( {
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: [ './edit-user.component.scss' ]
} )
export class EditUserComponent implements OnInit {

    formulario!: FormGroup;

    constructor( private formBuilder: FormBuilder ) {
    }

    ngOnInit(): void {
        this.loadForm();
    }

    onSubmit() {
        if ( this.formulario.valid ) {
            const value = this.formulario.value;
            console.log( value );
        }
    }

    private loadForm() {
        this.formulario = this.formBuilder.group( {
            username: [ null, [ Validators.required ] ],
            password: [ null, [ Validators.required ] ],
            habilitado: [ null, [ Validators.required ] ],
            rol: [ null, [ Validators.required ] ],
            celular: [ null ],
            email: [ null, [ Validators.required ] ],
            nombre: [ null, [ Validators.required ] ],
            usuario: [ null ]
        } );
    }
}
