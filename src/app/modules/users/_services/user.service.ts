import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSettings } from '../../../../proyect.conf';
import { UserInterface } from '../_models/user.interface';

@Injectable( {
  providedIn: 'root'
} )
export class UserService {
  private urlServicios = AppSettings.serviceUrl + '/users';
  
  constructor( private httpClient: HttpClient ) {
  
  }
  
  getAll() {
    return this.httpClient.get( this.urlServicios ).pipe( map( res => res as UserInterface[] ) );
  }
  
  save( data: UserInterface ) {
    return this.httpClient.post( this.urlServicios, data ).pipe( map( res => res as any ) );
  }
  
  setTheme( data: any ) {
    return this.httpClient.post( this.urlServicios, data ).pipe( map( res => res as any ) );
  }
  
  updateTheme( data: any ) {
    return this.httpClient.put( this.urlServicios, data ).pipe( map( res => res as any ) );
  }
  
  getTheme() {
    return this.httpClient.get( this.urlServicios ).pipe( map( res => res as any ) );
  }
}
