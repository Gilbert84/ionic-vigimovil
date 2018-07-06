export interface Dispositivo {
    uuid?: string;
    mac?:string;
    imei?:string;
    imsi?:string;
    iccid?:string;
    nombre:string;
    categoria:string;
    id?:string;
    activo?:boolean;
    img?:string;
};

export interface EstadoDispositivo{
    online:boolean;
    isActivo:boolean;
};

export interface Server{
    online:boolean;
    mensaje:string;
}
