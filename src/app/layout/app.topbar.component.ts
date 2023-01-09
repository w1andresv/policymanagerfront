import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';
import * as moment from 'moment-timezone';

@Component( {
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
} )
export class AppTopBarComponent {
  
  items!: MenuItem[];
  
  @ViewChild( 'menubutton' ) menuButton!: ElementRef;
  
  @ViewChild( 'topbarmenubutton' ) topbarMenuButton!: ElementRef;
  
  @ViewChild( 'topbarmenu' ) menu!: ElementRef;
  
  constructor( private router: Router,
               public layoutService: LayoutService ) {
  }
  
  get now() {
    return moment().tz( 'America/Bogota' ).locale('es').format( 'LL' );
  }
  
  signout() {
    localStorage.removeItem( 'Authorization' );
    this.router.navigate( [ '/auth/login' ] );
  }
}
