import { URL_SERVICIOS , URL_CONTADOR } from '../config/url.servicios.config';

interface DatosConfiguracion {
    autoInicio:boolean;
    areaMetropool:boolean;
    serverIp:string;
    contadorIp:string;
    apykey:string;  
}

export class Configuracion {
    autoInicio:boolean;
    areaMetropool:boolean;
    serverIp:string;
    contadorIp:string;
    apykey:string; 

    constructor(configuracion?:DatosConfiguracion){
        this.autoInicio = configuracion && configuracion.autoInicio || false;
        this.areaMetropool = configuracion && configuracion.areaMetropool || false;
        this.serverIp = configuracion && configuracion.serverIp || URL_SERVICIOS;
        this.contadorIp = configuracion && configuracion.contadorIp || URL_CONTADOR;
        this.apykey = configuracion && configuracion.apykey || 'apikey';
    }
}