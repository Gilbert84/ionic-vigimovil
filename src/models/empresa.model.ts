interface DatosEmpresa {
    nombre:string;
    nit:string;
    _id:string;
}

export class Empresa {
    public nombre:string;
    public nit:string;
    public _id:string;

    constructor(datosEmpresa?:DatosEmpresa) {

        this.nombre = datosEmpresa && datosEmpresa.nombre || '----';
        this.nit = datosEmpresa && datosEmpresa.nit || '----';
        this._id = datosEmpresa && datosEmpresa._id || this._id;

    }
}