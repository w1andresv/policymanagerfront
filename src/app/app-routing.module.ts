import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './_guards/auth.guard';

@NgModule( {
    imports: [
        RouterModule.forRoot( [
            {
                path: '', component: AppLayoutComponent, canActivate: [ AuthGuard ],
                children: [
                    { path: '', loadChildren: () => import('./components/dashboard/dashboard.module').then( m => m.DashboardModule ) },
                    {
                        path: 'documentation',
                        loadChildren: () => import('./components/documentation/documentation.module').then( m => m.DocumentationModule )
                    },
                    { path: 'pages', loadChildren: () => import('./components/pages/pages.module').then( m => m.PagesModule ) },
                ],
            },
            { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then( m => m.AuthModule ) },
            { path: 'pages/notfound', component: NotfoundComponent, canActivate: [ AuthGuard ] },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' } )
    ],
    exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
