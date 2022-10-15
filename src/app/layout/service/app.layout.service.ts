import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppConfig {
    inputStyle: string;
    colorScheme: string;
    theme: string;
    ripple: boolean;
    menuMode: string;
    scale: number;
}

interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}

@Injectable( {
    providedIn: 'root',
} )
export class LayoutService {

    config: AppConfig = {
        ripple: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'lara-light-blue',
        scale: 14,
    };

    state: LayoutState = {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    };

    private configUpdate = new Subject<AppConfig>();
    configUpdate$ = this.configUpdate.asObservable();
    private overlayOpen = new Subject<any>();
    overlayOpen$ = this.overlayOpen.asObservable();

    onMenuToggle() {
        if ( this.isOverlay() ) {
            this.state.overlayMenuActive = !this.state.overlayMenuActive;
            if ( this.state.overlayMenuActive ) {
                this.overlayOpen.next( null );
            }
        }

        if ( this.isDesktop() ) {
            this.state.staticMenuDesktopInactive = !this.state.staticMenuDesktopInactive;
        } else {
            this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;

            if ( this.state.staticMenuMobileActive ) {
                this.overlayOpen.next( null );
            }
        }
    }

    showProfileSidebar() {
        this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
        if ( this.state.profileSidebarVisible ) {
            this.overlayOpen.next( null );
        }
    }

    showConfigSidebar() {
        this.state.configSidebarVisible = true;
    }

    isOverlay() {
        return this.config.menuMode === 'overlay';
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }

    onConfigUpdate() {
        this.configUpdate.next( this.config );
    }

    setTheme() {
        let theme = localStorage.getItem( 'theme' ) as string;
        if ( theme ) {
            localStorage.setItem( 'theme', theme );
        } else {
            theme = 'lara-light-blue';
            localStorage.setItem( 'theme', theme );
        }
        const themeLink = <HTMLLinkElement> document.getElementById( 'theme-css' );
        const newHref = themeLink.getAttribute( 'href' )!.replace( this.config.theme, theme );
        this.replaceThemeLink( newHref, () => {
            this.config.theme = theme;
            this.onConfigUpdate();
        } );
    }

    replaceThemeLink( href: string, onComplete: Function ) {
        const id = 'theme-css';
        const themeLink = <HTMLLinkElement> document.getElementById( 'theme-css' );
        const cloneLinkElement = <HTMLLinkElement> themeLink.cloneNode( true );
        cloneLinkElement.setAttribute( 'href', href );
        cloneLinkElement.setAttribute( 'id', id + '-clone' );

        themeLink.parentNode!.insertBefore( cloneLinkElement, themeLink.nextSibling );

        cloneLinkElement.addEventListener( 'load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute( 'id', id );
            onComplete();
        } );
    }
}
