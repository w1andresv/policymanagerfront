import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../_shared/shared.module';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule( {
    declarations: [
        UsersComponent,
        EditUserComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        UsersRoutingModule
    ]
} )
export class UsersModule {
}
