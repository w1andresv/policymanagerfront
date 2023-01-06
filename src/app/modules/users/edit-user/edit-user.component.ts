import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '../_models/user.interface';
import { SelectItem } from 'primeng/api';
import { UserService } from '../_services/user.service';

@Component( {
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: [ './edit-user.component.scss' ],
} )
export class EditUserComponent implements OnInit {
  formulario!: FormGroup;
  submitted: boolean = false;
  showPass: string = 'password';
  eye!: string;
  showConfim: string = 'password';
  
  eyeNew!: string;
  user!: UserInterface;
  listaRoles: SelectItem[] = [ { label: 'Admin', value: 'ADMIN' } ];
  
  constructor( private formBuilder: FormBuilder,
               private userService: UserService ) {
  }
  
  get f() {
    return this.formulario.controls;
  }
  
  atras() {
  }
  
  ngOnInit(): void {
    this.loadForm();
  }
  
  onSubmit() {
    if ( this.formulario.valid ) {
      const value = this.formulario.value;
      this.userService.save( value ).subscribe( res => {
        console.log( res );
      } );
    }
  }
  
  
  show( event: boolean ) {
  }
  
  private loadForm() {
    this.formulario = this.formBuilder.group( {
      username: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      passwordConfirm: [ null, [ Validators.required ] ],
      enabled: [ true ],
      rol: [ null, [ Validators.required ] ],
      celular: [ null ],
      email: [ null ],
      name: [ null, [ Validators.required ] ],
      usuario: [ null ],
    } );
  }
}
