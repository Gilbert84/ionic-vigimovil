import { Dispositivo } from "./dispositivo.model";
import { Empresa } from "./empresa.model";

interface DatosVehiculo {
    activo:boolean;
    borrado:boolean;
    capacidad:string;
    categoria:string;
    disponible:boolean;
    fechaActualizado:Date;
    fechaCreado:Date;
    placa:string;
    interno:string;
    modelo:string;
    _id:string;
    dispositivo:Dispositivo;
    empresa:Empresa;
}

export class Vehiculo {
    
    activo:boolean;
    borrado:boolean;
    capacidad:string;
    categoria:string;
    disponible:boolean;
    fechaActualizado:Date;
    fechaCreado:Date;
    placa:string;
    interno:string;
    modelo:string;
    _id:string;
    dispositivo:Dispositivo;
    empresa:Empresa;
    
    constructor (vehiculo?: DatosVehiculo) {
        this.placa = vehiculo && vehiculo.placa || '---';
        this.interno = vehiculo && vehiculo.interno || '---';
        this.activo = vehiculo && vehiculo.activo || false;
        this.modelo = vehiculo && vehiculo.modelo || '----'
        this.borrado = vehiculo && vehiculo.borrado || true;
        this.capacidad = vehiculo && vehiculo.capacidad || '--';
        this.categoria = vehiculo && vehiculo.categoria || '--';
        this.disponible = vehiculo && vehiculo.disponible || false;
        this.fechaActualizado = vehiculo && vehiculo.fechaActualizado || null;
        this.fechaCreado = vehiculo && vehiculo.fechaCreado || null;
        this.dispositivo = vehiculo && vehiculo.dispositivo || new Dispositivo();
        this._id = vehiculo && vehiculo._id || this._id;
        this.empresa = vehiculo && vehiculo.empresa || new Empresa();
    }
}