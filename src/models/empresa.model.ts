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

        this.nombre = datosEmpresa && datosEmpresa.nombre || null;
        this.nit = datosEmpresa && datosEmpresa.nit || null;
        this.nit = datosEmpresa && datosEmpresa._id || undefined;

    }
}