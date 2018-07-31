import { Empresa } from '../models/empresa.model';

interface DatosOperario {
    nombre: string;
    alias: string;
    password: string;
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
    public password: string;
    public identificacion: number;
    public disponible: boolean;
    public img: string;
    public usuario: string;
    public empresa: Empresa;
    public _id: string
    constructor( datosOperario?:DatosOperario ) {
        this.nombre = datosOperario && datosOperario.nombre || 'nombre';
        this.alias= datosOperario && datosOperario.alias || 'alias';
        this.password= datosOperario &&  datosOperario.password || 'password';
        this.identificacion= datosOperario && datosOperario.identificacion || 0;
        this.disponible = datosOperario && datosOperario.disponible || false;
        this.img = datosOperario && datosOperario.img || '';
        this.usuario = datosOperario && datosOperario.usuario || '';
        this.empresa = datosOperario && datosOperario.empresa || new Empresa();
        this._id = datosOperario && datosOperario._id || ''; 
    }
}
