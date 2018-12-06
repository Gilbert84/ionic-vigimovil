interface DatosRegistroContador {

    ch1In:number,
    ch1Out:number;
    ch2In:number;
    ch2Out:number;
    door1:number;
    door2:number;
    hora:Date;
    sensor:string;
    state:number;
    totalIn:number;
    totalOut:number;
}


export class RegistroContador {

    public ch1In:number;
    public ch1Out:number;
    public ch2In:number;
    public ch2Out:number;
    public door1:number;
    public door2:number;
    public hora:Date;
    public sensor:string;
    public state:number;
    public totalIn:number;
    public totalOut:number;

    constructor(registroContador?:DatosRegistroContador){

        this.ch1In = registroContador && registroContador.ch1In || 0;
        this.ch1Out = registroContador && registroContador.ch1Out || 0;
        this.ch2In = registroContador && registroContador.ch2In || 0;
        this.ch2Out = registroContador && registroContador.ch2Out || 0;
        this.door1 = registroContador && registroContador.door1 || 0;
        this.door2 = registroContador && registroContador.door2 || 0;
        this.totalIn = registroContador && registroContador.totalIn || 0;
        this.totalOut = registroContador && registroContador.totalOut || 0;
        this.sensor = registroContador && registroContador.sensor || 'contador'
        this.hora = registroContador && registroContador.hora || new Date();
    
    }
}


export enum Codigo {
    reiniciar=1,
    limpiar=2,
    recibido=3
}




interface DatosEventoContador {
	tipo:number;
	codigo: Codigo;
	mensaje: string;
}


export class EventoContador {


	tipo:number;
	codigo: number;
    mensaje: string;
    
    constructor (datosEventoContador:DatosEventoContador){

        this.tipo = datosEventoContador && datosEventoContador.tipo || 0;
        this.codigo = datosEventoContador && datosEventoContador.codigo || Codigo.recibido;
        this.mensaje = datosEventoContador && datosEventoContador.mensaje || 'ok';

    }
}