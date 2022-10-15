import { Component, Input } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { MenuService } from '../app.menu.service';
import { ThemeService } from '../../_services/theme.service';

@Component( {
    selector: 'app-config',
    templateUrl: './app.config.component.html'
} )
export class AppConfigComponent {

    @Input() minimal: boolean = false;

    scales: number[] = [ 12, 13, 14, 15, 16 ];

    constructor( public layoutService: LayoutService,
                 public themeService: ThemeService ) {
    }

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }

    set visible( _val: boolean ) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    get scale(): number {
        return this.layoutService.config.scale;
    }

    set scale( _val: number ) {
        this.layoutService.config.scale = _val;
    }

    get menuMode(): string {
        return this.layoutService.config.menuMode;
    }

    set menuMode( _val: string ) {
        this.layoutService.config.menuMode = _val;
    }

    get inputStyle(): string {
        return this.layoutService.config.inputStyle;
    }

    set inputStyle( _val: string ) {
        this.layoutService.config.inputStyle = _val;
    }

    get ripple(): boolean {
        return this.layoutService.config.ripple;
    }

    set ripple( _val: boolean ) {
        this.layoutService.config.ripple = _val;
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    changeTheme( theme: string, colorScheme: string ) {
        localStorage.setItem( 'theme', theme );
        this.themeService.updateTheme( { theme } ).subscribe( res => {
            const themeLink = <HTMLLinkElement> document.getElementById( 'theme-css' );
            const newHref = themeLink.getAttribute( 'href' )!.replace( this.layoutService.config.theme, theme );
            this.layoutService.config.colorScheme;
            this.layoutService.replaceThemeLink( newHref, () => {
                this.layoutService.config.theme = theme;
                this.layoutService.config.colorScheme = colorScheme;
                this.layoutService.onConfigUpdate();
            } );
        } );

    }


    decrementScale() {
        this.scale--;
        this.applyScale();
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }

    applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
    }
}
