import { Empresa } from '../models/empresa.model';

interface DatosOperario {
    nombre: string;
    alias: string;
    clave: string;
    identificacion: number;
    disponible: boolean;
    img: string;
    usuario: string;
    empresa: Empresa;
    _id: string    
}

export class Operario {
    public nombre: string;
    public alias: string;
    public clave: string;
    public identificacion: number;
    public disponible: boolean;
    public img: string;
    public usuario: string;
    public empresa: Empresa;
    public _id: string
    constructor( datosOperario?:DatosOperario ) {
        this.nombre = datosOperario && datosOperario.nombre || 'nombre';
        this.alias= datosOperario && datosOperario.alias || 'alias';
        this.clave= datosOperario &&  datosOperario.clave || '';
        this.identificacion= datosOperario && datosOperario.identificacion || 12345678;
        this.disponible = datosOperario && datosOperario.disponible || false;
        this.img = datosOperario && datosOperario.img || '';
        this.usuario = datosOperario && datosOperario.usuario || '';
        this.empresa = datosOperario && datosOperario.empresa || new Empresa();
        this._id = datosOperario && datosOperario._id || ''; 
    }
}
