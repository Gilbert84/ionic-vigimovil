import { Geoposition } from '@ionic-native/geolocation';

export class Puerta {

    abierta :Object={
        mensaje:'abierta',
        valor:1
    };

    cerrada: Object= {
        mensaje:'cerrada',
        valor:0
    }

    constructor () {
        this.abierta = this.abierta;
        this.cerrada = this.cerrada;
    }
    
}


export class Pasajero {
    ingresoPuerta1: Number;
    ingresoPuerta2: Number;
    salidaPuerta1: Number;
    salidaPuerta2: Number;
    hora: Date;

    constructor () {
        this.ingresoPuerta1 = this.ingresoPuerta1;
        this.ingresoPuerta2 = this.ingresoPuerta2;
        this.salidaPuerta1 = this.salidaPuerta1;
        this.salidaPuerta2 = this.salidaPuerta2;
    }
}


export class Contador {
    puerta1:Puerta;
    puerta2:Puerta;
    pasajeros:Pasajero [];

    constructor () {
        this.puerta1 = this.puerta1;
        this.puerta2 = this.puerta2;
        this.pasajeros = this.pasajeros;
    }
}



export class Dispositivo {
    public uuid?: string;
    public mac?:string;
    public imei?:string;
    public imsi?:string;
    public iccid?:string;
    public nombre:string;
    public categoria:string;
    public _id?:string;
    public activo?:boolean;
    public img?:string;
    public simcard1?:string;
    public simcard2?:string;
    public geoposicion?:Geoposition;
    public socket_id?:string;

    constructor () {
        this.uuid = this.uuid || '12345678';
        this.mac = this.mac || '28:30:32:48';
        this.imei = this.imei || 'imei';
        this.imsi = this.imsi || 'imsi';
        this.iccid = this.iccid || 'iccid';
        this.nombre = this.nombre || 'TABLET K900';
        this.categoria = this.categoria || 'TABLET';
        this._id = this._id;
        this.activo = this.activo;
        this.img = this.img;
        this.simcard1 = this.simcard1;
        this.simcard2 = this.simcard2;
        this.geoposicion = this.geoposicion;
        this.socket_id = this.socket_id;
    }
}