import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../_shared/shared.module';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';


@NgModule( {
    declarations: [
        UsersComponent,
        EditUserComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        UsersRoutingModule,
        KeyFilterModule
    ]
} )
export class UsersModule {
}
