class Empresa {
    nombre: string;
    constructor(){
        this.nombre = this.nombre || '';
    }
}


export class Operario {
    public nombre?: string;
    public alias?: string;
    public password?: string;
    public identificacion?: number;
    public disponible?: boolean;
    public img?: string;
    public usuario?: string;
    public empresa: Empresa;
    public _id?: string
    constructor() {
        this.nombre = this.nombre || 'nombre';
        this.alias= this.alias || 'alias';
        this.password= this.password || 'password';
        this.identificacion= this.identificacion || 0;
        this.disponible = this.disponible || false;
        this.img = this.img || '';
        this.usuario = this.usuario || '';
        this.empresa = new Empresa;
        this._id = this._id || ''; 
    }
}
