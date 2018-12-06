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

interface DatosDispositivo {
    uuid: string;
    mac:string;
    imei:string;
    imsi:string;
    iccid:string;
    nombre:string;
    categoria:string;
    _id:string;
    activo:boolean;
    img:string;
    simcard1:string;
    simcard2:string;
    geoposicion:Geoposition
    socket_id:string;
    disponible:boolean;
    borrado:boolean;
}

export class Dispositivo {
    
    public uuid: string;
    public mac:string;
    public imei:string;
    public imsi:string;
    public iccid:string;
    public nombre:string;
    public categoria:string;
    public _id:string;
    public activo:boolean;
    public img:string;
    public simcard1:string;
    public simcard2:string;
    public geoposicion:Geoposition
    public socket_id:string;
    public disponible:boolean;
    public borrado:boolean;



    constructor (dispositivo?:DatosDispositivo) {

        this.uuid = dispositivo && dispositivo.uuid || 'tablet-virtual';
        this.mac = dispositivo && dispositivo.mac || '28:30:32:48';
        this.imei = dispositivo && dispositivo.imei || 'imei';
        this.imsi = dispositivo && dispositivo.imsi || 'imsi';
        this.iccid = dispositivo && dispositivo.iccid || 'iccid';
        this.nombre = dispositivo && dispositivo.nombre || this.uuid;
        this.categoria = dispositivo && dispositivo.categoria || 'VIRTUAL';
        this._id = dispositivo && dispositivo._id || this._id;
        this.activo = dispositivo && dispositivo.activo || false;
        this.img = dispositivo && dispositivo.img || this.img;
        this.simcard1 = dispositivo && dispositivo.simcard1 || '';
        this.simcard2 = dispositivo && dispositivo.simcard2 || '';
        this.geoposicion = dispositivo && dispositivo.geoposicion ||  new Geoposicion();
        this.socket_id = dispositivo && dispositivo.socket_id || null;
        this.disponible = dispositivo && dispositivo.disponible || true;
        this.borrado = dispositivo && dispositivo.borrado || false;
    }
}