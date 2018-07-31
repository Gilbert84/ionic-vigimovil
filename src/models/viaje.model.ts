import { Ruta } from "./ruta.model";
import { Asignacion } from './asignacion.model';
import { RegistroContador } from './registro-contador.model';


interface DatosEstado {
    mensaje:string;
    codigo:number;
}

class Estado {
 
    mensaje:string;
    codigo:number;

    constructor(datosEstado?:DatosEstado) {

        this.mensaje = datosEstado && datosEstado.mensaje || '';
        this.codigo = datosEstado && datosEstado.codigo || 0;
    }
}

interface DatosViaje {
    _id:string;
    usuario:string;
    ruta:Ruta;
    asignacion:Asignacion;
    pasajeros:RegistroContador;
    horaSalidaAsignada:Date;
    horaLlegadaAsignada:Date;
    horaSalidaOperario:Date;
    horallegadaOperario:Date;
    enviadoAreaMetropol:boolean;
    fechaCreado:Date;
    estado:Estado;
}

export class Viaje {
    public _id:string;
    public usuario:string;
    public ruta:Ruta;
    public asignacion:Asignacion;
    public pasajeros:RegistroContador;
    public horaSalidaAsignada:Date;
    public horaLlegadaAsignada:Date;
    public horaSalidaOperario:Date;
    public horallegadaOperario:Date;
    public enviadoAreaMetropol:boolean;
    public fechaCreado:Date;
    public estado:Estado;

    constructor (datosViaje?:DatosViaje) {

        this._id = datosViaje && datosViaje._id;
        this.usuario = datosViaje && datosViaje.usuario;
        this.ruta = datosViaje && datosViaje.ruta || new Ruta();
        this.asignacion = datosViaje && datosViaje.asignacion || new Asignacion();
        this.pasajeros = datosViaje && datosViaje.pasajeros || new RegistroContador();
        this.horaSalidaAsignada = datosViaje && datosViaje.horaSalidaAsignada || new Date();
        this.horaLlegadaAsignada = datosViaje && datosViaje.horaLlegadaAsignada || new Date();
        this.horaSalidaOperario = datosViaje && datosViaje.horaSalidaOperario || new Date();
        this.horallegadaOperario = datosViaje && datosViaje.horallegadaOperario || new Date();
        this.fechaCreado = datosViaje && datosViaje.fechaCreado || new Date();
        this.estado = datosViaje && datosViaje.estado || new Estado();
        this.enviadoAreaMetropol = datosViaje && datosViaje.enviadoAreaMetropol || false;
    }
}