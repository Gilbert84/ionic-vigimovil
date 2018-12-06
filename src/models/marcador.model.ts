interface DatosTipoMarcador {
    _id: number;
    nombre: string;
    img: string;  
}


export class TipoMarcador {
    public _id: number;
    public nombre: string;
    public img: string ;
  
    constructor(tipoMarcador?:DatosTipoMarcador) {
      this._id = tipoMarcador && tipoMarcador._id || null;
      this.nombre = tipoMarcador && tipoMarcador.nombre || 'marcador';
      this.img = tipoMarcador && tipoMarcador.img || null;
    }
}



interface DatosMarcador {
    lat: number;
    lng: number;
    direccion: string;
    codigo: string;
    arrastable: boolean;
    tipo: TipoMarcador;
    nombre: string;
    descripcion: string;
    _id: string;   
}
  
export class Marcador {

    public _id?: string;
    public lat: number;
    public lng: number;
    public direccion: string;
    public codigo: string;
    public arrastable: boolean;
    public tipo: TipoMarcador;
    public nombre: string;
    public descripcion?: string = 'Sin descipcion';
    
  
    constructor(marcador?:DatosMarcador) {
        this._id = marcador && marcador._id || null;
        this.lat = marcador && marcador.lat || 6.123456;
        this.lng = marcador && marcador.lng || -75.123456;
        this.direccion = marcador && marcador.direccion;
        this.codigo = marcador && marcador.codigo || 'mrk';
        this.nombre = marcador && marcador.nombre || 'marcador';
        this.descripcion = marcador && marcador.descripcion || 'sin descripcion';
        this.arrastable = marcador && marcador.arrastable || true;
        this.tipo = marcador && marcador.tipo || new TipoMarcador();
    }
}