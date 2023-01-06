import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../_services/authentication.service';
import { Router } from '@angular/router';
import { NavService } from '../../../_services/_nav.service';
import { ThemeService } from '../../../_services/theme.service';

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
               private navService: NavService,
               private themeService: ThemeService,
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
      this.loading = true;
      const value = this.formulario.value;
      this.authenticationService.login( value ).subscribe( res => {
        if ( res.estado ) {
          localStorage.setItem( 'Authorization', res.token );
          setTimeout( () => {
            this.themeService.getTheme().subscribe( res => {
              if ( !res ) {
                this.themeService.setTheme( { theme: 'lara-light-blue' } ).subscribe( resp => {
                  localStorage.setItem( 'theme', res.theme );
                  this.layoutService.setTheme();
                } );
              } else {
                localStorage.setItem( 'theme', res.theme );
                this.layoutService.setTheme();
              }
            } );
          }, 100 );
          this.router.navigate( [ '/' ] );
          this.loading = false;
        } else {
          this.navService.toast( 3, 'Usuario y/o contraseña incorectos' );
          localStorage.removeItem( 'Authorization' );
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
