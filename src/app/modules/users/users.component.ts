import { Component, OnInit } from '@angular/core';
import { UserService } from './_services/user.service';
import { UserInterface } from './_models/user.interface';

@Component( {
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.scss' ]
} )
export class UsersComponent implements OnInit {
  users: UserInterface[] = [];
  
  constructor( private userService: UserService ) {
  }
  
  ngOnInit(): void {
    this.loadData();
  }
  
  edit( event: UserInterface ) {
    console.log( event );
    
  }
  
  delete( event: UserInterface ) {
    console.log( event );
    
  }
  
  private loadData() {
    this.userService.getAll().subscribe( ( res: UserInterface[] ) => {
      this.users = res;
      console.log( res );
    } );
  }
}
