import { environment } from './environments/environment';

/**
 * PROVIDES STATIC CONSTANTS WITH THE GENERAL APP SETTINGS
 */
export class AppSettings {

    /**
     * Variable que determina si esta o no en producción
     * @type {boolean}
     */
    public static isProduction = environment.production;

    /**
     * Base URL for all the queries
     * @type {string}
     */
    public static serviceUrl = environment.endpoint;


}

