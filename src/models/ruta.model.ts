
interface Marcador {
    lat: number;
    lng: number;
    direccion: string;
    codigo: string;
    arrastable: boolean;
    nombre: string;
    descripcion: string;
    fechaCreado: Date;
    fechaActualizado: Date;
    usuario: any;
    tipo:any;
}


class Origen {
    public lat: number;
    public lng: number;
    public direccion: string;
    public codigo: string;
    public arrastable: boolean;
    public nombre: string;
    public descripcion: string;
    public fechaCreado: Date;
    public fechaActualizado: Date;
    public usuario: any;
    public tipo:any;

    constructor (datosOrigen?:Marcador) {

        this.lat = datosOrigen && datosOrigen.lat || 6.1234;
        this.lng = datosOrigen && datosOrigen.lng || -75.1234;
        this.direccion = datosOrigen && datosOrigen.direccion || 'vacio';
        this.codigo = datosOrigen && datosOrigen.codigo || 'vacio';
        this.arrastable = datosOrigen && datosOrigen.arrastable || false;
        this.nombre = datosOrigen && datosOrigen.nombre || 'vacio';
        this.descripcion = datosOrigen && datosOrigen.descripcion || 'vacio';
        this.fechaCreado = datosOrigen && datosOrigen.fechaCreado || new Date();
        this.fechaActualizado = datosOrigen && datosOrigen.fechaActualizado || new Date();
        this.usuario = datosOrigen && datosOrigen.usuario || null;
        this.tipo = datosOrigen && datosOrigen.tipo || null;

    }
}

class Destino {
    public lat: number;
    public lng: number;
    public direccion: string;
    public codigo: string;
    public arrastable: boolean;
    public nombre: string;
    public descripcion: string;
    public fechaCreado: Date;
    public fechaActualizado: Date;
    public usuario: any;
    public tipo:any;

    constructor (datosDestino?:Marcador) {

        this.lat = datosDestino && datosDestino.lat || 6.1234;
        this.lng = datosDestino && datosDestino.lng || -75.1234;
        this.direccion = datosDestino && datosDestino.direccion || '';
        this.codigo = datosDestino && datosDestino.codigo || '';
        this.arrastable = datosDestino && datosDestino.arrastable || false;
        this.nombre = datosDestino && datosDestino.nombre || '';
        this.descripcion = datosDestino && datosDestino.descripcion || '';
        this.fechaCreado = datosDestino && datosDestino.fechaCreado || new Date();
        this.fechaActualizado = datosDestino && datosDestino.fechaActualizado || new Date();
        this.usuario = datosDestino && datosDestino.usuario || null;
        this.tipo = datosDestino && datosDestino.tipo || null;

    }
    
}


interface DatosRuta {
    _id:string;
    nombre:string;
    codigo:number;
    usuario:string;
    origen:Origen;
    destino:Destino;
    visible:boolean;
    distancia:number;
    duraccion:number;
    fechaCreado:Date;
    pasos:any;
    puntosControl:any;
    puntosRef:any;
    
}




export class Ruta {

    _id:string;
    nombre:string;
    codigo:number;
    usuario:string;
    origen:Origen;
    destino:Destino;
    visible:boolean;
    distancia:number;
    duraccion:number;
    fechaCreado:Date;
    pasos:any;
    puntosControl:any;
    puntosRef:any;

    constructor (datosRuta?:DatosRuta) {
        this._id = datosRuta && datosRuta._id;
        this.nombre = datosRuta && datosRuta.nombre || '';
        this.codigo = datosRuta && datosRuta.codigo || 0;
        this.usuario = datosRuta && datosRuta.usuario || null;
        this.origen = datosRuta && datosRuta.origen || new Origen();
        this.destino = datosRuta && datosRuta.destino || new Destino();
        this.visible = datosRuta && datosRuta.visible || true;
        this.distancia = datosRuta && datosRuta.distancia || 0;
        this.duraccion = datosRuta && datosRuta.duraccion || 0;
        this.fechaCreado = datosRuta && datosRuta.fechaCreado || new Date();
        this.pasos = datosRuta && datosRuta.pasos;
        this.puntosControl = datosRuta && datosRuta.puntosControl;
        this.puntosRef = datosRuta && datosRuta.puntosRef;
    }
}