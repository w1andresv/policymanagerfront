import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '../_models/user.interface';
import { SelectItem } from 'primeng/api';
import { UserService } from '../_services/user.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NavService } from '../../../_services/_nav.service';

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
  saving: boolean = false;
  
  constructor( private formBuilder: FormBuilder,
               public ref: DynamicDialogRef,
               public config: DynamicDialogConfig,
               private navService: NavService,
               private userService: UserService ) {
  }
  
  get f() {
    return this.formulario.controls;
  }
  
  atras() {
    this.close();
  }
  
  close( user?: UserInterface ) {
    this.ref.close( user );
  }
  
  ngOnInit(): void {
    this.user = {} as UserInterface;
    this.user = this.config.data;
    this.loadForm( this.user );
  }
  
  onSubmit() {
    this.formulario.markAllAsTouched();
    this.submitted = true;
    if ( this.formulario.valid ) {
      const value = this.formulario.value;
      this.saving = true;
      if ( value._id ) {
        this.update( value );
      } else {
        this.save( value );
      }
    }
  }
  
  
  private save( user: UserInterface ) {
    this.userService.save( user ).subscribe( {
      next: ( res ) => {
        this.navService.toast( 1 );
        this.saving = false;
        this.close( res );
      },
      error: ( e ) => {
        this.navService.toast( 3 );
        this.saving = false;
      }
    } );
  }
  
  private update( user: UserInterface ) {
    this.userService.update( user ).subscribe( {
      next: ( res ) => {
        this.navService.toast( 2 );
        this.saving = false;
        this.close( res );
      },
      error: ( e ) => {
        this.navService.toast( 3 );
        this.saving = false;
      }
    } );
  }
  
  private loadForm( data: UserInterface ) {
    this.formulario = this.formBuilder.group( {
      _id: [ data?._id || null ],
      username: [ data?.username || null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      passwordConfirm: [ null, [ Validators.required ] ],
      enabled: [ data?.enabled || null ],
      rol: [ data?.rol || null, [ Validators.required ] ],
      phone: [ data?.phone || null ],
      email: [ data?.email || null ],
      name: [ data?.name || null, [ Validators.required ] ],
      creationUser: [ data?.creationUser || null ],
    } );
  }
}
