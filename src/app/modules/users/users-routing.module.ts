import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule( {
    imports: [ RouterModule.forChild( [
        { path: '', component: UsersComponent },
        { path: 'new', component: EditUserComponent },
        { path: 'edit/:id', component: EditUserComponent }
    ] ) ],
    exports: [ RouterModule ]
} )
export class UsersRoutingModule {
}
