

interface DatosSocketIO {
    conectado:boolean | any;
    desconectado:boolean | any;
    id:string | any;
    mensaje:string;
    icono:string;
    color:string;
}


export class SocketIO {
    conectado:boolean | any;
    desconectado:boolean | any;
    id:string | any;
    mensaje:string;
    icono:string;
    color:string;
    
    constructor(socketIO?:DatosSocketIO | any){
        this.conectado = socketIO && socketIO.conectado || false;
        this.desconectado = socketIO && socketIO.desconectado || true;
        this.id = socketIO && socketIO.id || this.id;
        this.mensaje = socketIO && socketIO.mensaje || 'Fuera de linea';
        this.icono = socketIO && socketIO.icono || 'close-circle';
        this.color = socketIO && socketIO.color || 'danger';
    }
}