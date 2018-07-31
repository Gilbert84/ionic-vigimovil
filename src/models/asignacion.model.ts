import { Operario } from "./operario.model";
import { Vehiculo } from "./vehiculo.model";

interface DatosAsignacion {
    _id: string;
    fechaHora:Date;
    disponible:boolean;
    usuario:any;
    operario:Operario;
    vehiculo: any;
    fechaCreado:Date;  
}

export class Asignacion {

   public  _id: string;
   public fechaHora:Date;
   public disponible:boolean;
   public usuario:any;
   public operario:Operario;
   public vehiculo: any;
   public fechaCreado:Date;  

   constructor(datosAsignacion?:DatosAsignacion) {
        this._id = datosAsignacion && datosAsignacion._id || null;
        this.fechaHora = datosAsignacion && datosAsignacion.fechaHora || new Date();
        this.disponible = datosAsignacion && datosAsignacion.disponible || false;
        this.usuario = datosAsignacion && datosAsignacion.usuario || null;
        this.operario = datosAsignacion && datosAsignacion.operario || new Operario();
        this.vehiculo = datosAsignacion && datosAsignacion.vehiculo || new Vehiculo();
        this.fechaCreado = datosAsignacion && datosAsignacion.fechaCreado || new Date();
   }
}