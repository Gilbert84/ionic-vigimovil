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

export class Coords {

    latitude:number =6.34475;
    longitude: number = -75.563122;
    accuracy: number =0;
    altitude :number =0;
    altitudeAccuracy:number =0;
    heading: number=0;
    speed:number=0;
    constructor() {
        this.latitude = this.latitude;
        this.longitude = this.longitude; 
        this.accuracy = this.accuracy;
        this.altitude = this.altitude;
        this.altitudeAccuracy = this.altitudeAccuracy;
        this.heading = this.heading;
        this.speed = this.speed;
    }
}

export class Geoposicion {
    coords:Coords;
    timestamp:number;
    constructor(){
        this.coords = new Coords();
        this.timestamp = this.timestamp || 0;
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
    public geoposicion?:Geoposition
    public socket_id?:string;
    public disponible?:boolean;



    constructor () {

        this.uuid = this.uuid || '12345678';
        this.mac = this.mac || '28:30:32:48';
        this.imei = this.imei || 'imei';
        this.imsi = this.imsi || 'imsi';
        this.iccid = this.iccid || 'iccid';
        this.nombre = this.nombre || 'TABLET K900';
        this.categoria = this.categoria || 'TABLET';
        this._id = this._id;
        this.activo = this.activo || false;
        this.img = this.img || '';
        this.simcard1 = this.simcard1 || '';
        this.simcard2 = this.simcard2 || '';
        this.geoposicion = new Geoposicion();
        this.socket_id = this.socket_id;
        this.disponible = this.disponible || true;
    }
}