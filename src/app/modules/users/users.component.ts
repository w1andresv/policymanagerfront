import { Component, OnInit } from '@angular/core';
import { UserService } from './_services/user.service';
import { UserInterface } from './_models/user.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NavService } from '../../_services/_nav.service';
import { ConfirmationService } from 'primeng/api';

@Component( {
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.scss' ],
  providers: [ DialogService, ConfirmationService ]
} )
export class UsersComponent implements OnInit {
  users: UserInterface[] = [];
  ref!: DynamicDialogRef;
  user!: UserInterface;
  
  constructor( private userService: UserService,
               private navService: NavService,
               private confirmationService: ConfirmationService,
               public dialogService: DialogService, ) {
  }
  
  ngOnInit(): void {
    this.loadData();
  }
  
  edit( event: UserInterface ) {
    this.user = event;
    this.show( this.user );
    
  }
  
  new() {
    const user = {} as UserInterface;
    this.show( user );
  }
  
  changeStatus( user: UserInterface ) {
    this.update( user );
  }
  
  delete( event: UserInterface ) {
    this.confirm( event );
  }
  
  private show( data: UserInterface ) {
    this.ref = this.dialogService.open( EditUserComponent, {
      data,
      header: 'Choose a Product',
      width: '50%',
      contentStyle: { 'overflow': 'auto' },
      baseZIndex: 10000,
      maximizable: false
    } );
    this.ref.onClose.subscribe( ( user: UserInterface ) => {
      if ( user ) {
        this.setUpdateUser( user );
      } else {
        console.log( 'close' );
      }
    } );
  }
  
  private loadData() {
    this.userService.getAll().subscribe( {
      next: ( res: UserInterface[] ) => {
        this.users = res;
      }, error: ( e ) => {
        this.navService.toast( 3 );
      }
    } );
  }
  
  private setUpdateUser( user: UserInterface ) {
    const index = this.users.findIndex( u => u._id === user._id );
    if ( index > 0 ) {
      this.users[ index ] = user;
    } else {
      this.users.push( user );
    }
  }
  
  private update( user: UserInterface ) {
    this.userService.update( user ).subscribe( {
      next: ( res ) => {
        this.navService.toast( 2 );
      },
      error: ( e ) => {
        this.navService.toast( 3 );
      }
    } );
  }
  
  private confirm( user: UserInterface ) {
    this.confirmationService.confirm( {
      message: 'Esta seguro de elimiar este item?',
      header: 'Confirmación',
      key: 'user',
      icon: 'pi pi-info-circle',
      accept: () => {
      },
      reject: () => {
      },
    } );
  }
  
}
