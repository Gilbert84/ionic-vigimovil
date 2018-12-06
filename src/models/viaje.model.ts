import { Ruta } from "./ruta.model";
import { Asignacion } from './asignacion.model';
import { RegistroContador } from './registro-contador.model';
import { Usuario } from "./usuario.model";

export enum Codigo {
    pendiente = 0,
    actualizando = 1,
    aceptado = 2,
    cancelado = 3,
    enRuta = 4,
    llegando = 5,
    barado = 6,
    terminado = 7  
}

export enum Mensaje {
    pendiente = 'pendiente',
    actualizando = 'actualizando',
    aceptado = 'aceptado',
    cancelado = 'cancelado',
    enRuta = 'enRuta',
    llegando = 'llegando',
    barado = 'barado',
    terminado = 'terminado'  
}


interface DatosEstado {
    mensaje:Mensaje;
    codigo:Codigo;
}

class Estado {
 
    mensaje:Mensaje;
    codigo:Codigo;

    constructor(datosEstado?:DatosEstado) {

        this.mensaje = datosEstado && datosEstado.mensaje || Mensaje.pendiente;
        this.codigo = datosEstado && datosEstado.codigo || Codigo.pendiente;
    }
}

interface DatosViaje {
    _id:string;
    usuario:Usuario;
    ruta:Ruta;
    asignacion:Asignacion;
    pasajeros:RegistroContador;
    horaSalidaAsignada:Date;
    horaLlegadaAsignada:Date;
    horaSalidaOperario:Date;
    horallegadaOperario:Date;
    enviadoAreaMetropol:boolean;
    fechaCreado:Date;
    fechaActualizado:Date;
    estado:Estado;
    numeroDespacho:number;
    archivoAreaMetropol:string;
    sincronizado:boolean;
    encolar:boolean;
}


export class Viaje {
    
    public _id:string;
    public usuario:Usuario;
    public ruta:Ruta;
    public asignacion:Asignacion;
    public pasajeros:RegistroContador;
    public horaSalidaAsignada:Date;
    public horaLlegadaAsignada:Date;
    public horaSalidaOperario:Date;
    public horallegadaOperario:Date;
    public enviadoAreaMetropol:boolean;
    public fechaCreado:Date;
    public fechaActualizado:Date;
    public estado:Estado;
    public numeroDespacho:number;
    public archivoAreaMetropol:string;
    public sincronizado:boolean;
    public encolar:boolean;

    constructor (datosViaje?:DatosViaje) {

        this._id = datosViaje && datosViaje._id || this._id;
        this.usuario = datosViaje && datosViaje.usuario || new Usuario();
        this.ruta = datosViaje && datosViaje.ruta || new Ruta();
        this.asignacion = datosViaje && datosViaje.asignacion || new Asignacion();
        this.pasajeros = datosViaje && datosViaje.pasajeros || new RegistroContador();
        this.horaSalidaAsignada = datosViaje && datosViaje.horaSalidaAsignada || new Date();
        this.horaLlegadaAsignada = datosViaje && datosViaje.horaLlegadaAsignada || new Date();
        this.horaSalidaOperario = datosViaje && datosViaje.horaSalidaOperario || new Date();
        this.horallegadaOperario = datosViaje && datosViaje.horallegadaOperario || new Date();
        this.fechaCreado = datosViaje && datosViaje.fechaCreado || new Date();
        this.fechaActualizado = datosViaje && datosViaje.fechaActualizado || new Date();
        this.estado = datosViaje && datosViaje.estado || new Estado();
        this.enviadoAreaMetropol = datosViaje && datosViaje.enviadoAreaMetropol || false;
        this.numeroDespacho = datosViaje && datosViaje.numeroDespacho || 0;
        this.archivoAreaMetropol = datosViaje && datosViaje.archivoAreaMetropol || this.archivoAreaMetropol;
        this.sincronizado = datosViaje && datosViaje.sincronizado || false;
        this.encolar = datosViaje && datosViaje.encolar || false;
    }
}

