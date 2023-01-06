import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './modules/pages/notfound/notfound.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestsInterceptor } from './_interceptor/requests.interceptor';
import { UploadComponent } from './components/upload/upload.component';
import { FileUploadModule } from 'primeng/fileupload';
import { SharedModule } from './_shared/shared.module';

@NgModule( {
  declarations: [
    AppComponent,
    NotfoundComponent,
    UploadComponent
  ],
  imports: [
    AppRoutingModule,
    AppLayoutModule,
    FileUploadModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule {
}
