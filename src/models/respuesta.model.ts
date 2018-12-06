import { Dispositivo } from "./dispositivo.model";
import { Operario } from "./operario.model";

interface DatosRespuesta{
    ok:boolean;
    mensaje:string;
    data:Dispositivo | Operario ;
    error?:any;
}

export class Respuesta {

    ok:boolean;
    mensaje:string;
    data:Dispositivo | Operario;
    error?:any;

    constructor(respuesta:DatosRespuesta){
        this.ok = respuesta && respuesta.ok;
        this.mensaje = respuesta && respuesta.mensaje;
        this.data = respuesta && respuesta.data;
        this.error = respuesta && respuesta.error;
    }

}