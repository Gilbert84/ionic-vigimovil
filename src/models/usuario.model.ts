interface DatosUsuario {
    nombre: string,
    email: string,
    password: string,
    img: string,
    role: string,
    google: boolean,
    _id: string,
    fechaCreado: Date,
    fechaActualizado: Date    
}


export class Usuario {

    public nombre: string;
    public email: string;
    public password: string;
    public img: string;
    public role: string;
    public google: boolean;
    public _id: string;
    public fechaCreado: Date;
    public fechaActualizado: Date;
    
    constructor(usuario?:DatosUsuario){
        this.nombre = usuario && usuario.nombre || '';
        this.email = usuario && usuario.email || '';
        this.password = usuario && usuario.password || '';
        this.img = usuario && usuario.img || this.img;
        this.role = usuario && usuario.role || 'USUARIO';
        this.google = usuario && usuario.google || false;
        this.fechaCreado = usuario && usuario.fechaCreado  || this.fechaCreado;
        this.fechaActualizado = usuario && usuario.fechaActualizado || this.fechaActualizado;
        this._id = usuario && usuario._id || this._id;
    }        
}


