import { Operario } from "./operario.model";
import { Vehiculo } from "./vehiculo.model";
import { Usuario } from "./usuario.model";
import { Marcador } from "./marcador.model";

interface DatosAsignacion{
    disponible:boolean;
    fechaActualizado:Date;
    fechaCreado:Date;
    fechaHora:Date;
    operario:Operario;
    pernocta:boolean;
    tarjeta:number;
    terminal:Marcador;
    usuario:Usuario;
    vehiculo:Vehiculo;
    _id:string;
  }

export class Asignacion {

    disponible:boolean;
    fechaActualizado:Date;
    fechaCreado:Date;
    fechaHora:Date;
    operario:Operario;
    pernocta:boolean;
    tarjeta:number;
    terminal:Marcador;
    usuario:Usuario;
    vehiculo:Vehiculo;
    _id:string;
    
    constructor(asignacion?:DatosAsignacion) {
      this.disponible = asignacion && asignacion.disponible || false;
      this.fechaActualizado = asignacion && asignacion.fechaActualizado || this.fechaActualizado;
      this.fechaCreado = asignacion && asignacion.fechaCreado || this.fechaCreado;
      this.fechaHora = asignacion && asignacion.fechaHora || this.fechaHora;
      this.pernocta = asignacion && asignacion.pernocta || false;
      this.tarjeta = asignacion && asignacion.tarjeta || 0;
      this._id = asignacion && asignacion._id || this._id;
      this.operario = asignacion && asignacion.operario || new Operario();
      this.usuario = asignacion && asignacion.usuario || new Usuario();
      this.vehiculo = asignacion && asignacion.vehiculo || new Vehiculo();
      this.terminal = asignacion && asignacion.terminal || new Marcador();
    }
  }