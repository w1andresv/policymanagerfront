import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './layout/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';

@NgModule( {
  imports: [
    RouterModule.forRoot( [
      {
        path: '', component: AppLayoutComponent,
        children: [
          { path: '', loadChildren: () => import('./layout/components/dashboard/dashboard.module').then( m => m.DashboardModule ) },
          {
            path: 'documentation',
            loadChildren: () => import('./layout/components/documentation/documentation.module').then( m => m.DocumentationModule )
          },
          { path: 'pages', loadChildren: () => import('./layout/components/pages/pages.module').then( m => m.PagesModule ) },
        ],
      },
      { path: 'auth', loadChildren: () => import('./layout/components/auth/auth.module').then( m => m.AuthModule ) },
      { path: 'pages/notfound', component: NotfoundComponent },
      { path: '**', redirectTo: 'pages/notfound' },
    ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' } )
  ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
