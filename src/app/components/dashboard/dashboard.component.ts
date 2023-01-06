import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component( {
    templateUrl: './dashboard.component.html',
} )
export class DashboardComponent implements OnInit {

    items!: MenuItem[];

    chartOptions: any;

    subscription!: Subscription;

    constructor( public layoutService: LayoutService ) {
    }

    ngOnInit() {

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

}
