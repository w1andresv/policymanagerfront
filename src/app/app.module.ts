import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { EventService } from './layout/service/event.service';
import { NotfoundComponent } from './layout/components/notfound/notfound.component';

@NgModule( {
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        EventService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
