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
};

export interface EstadoDispositivo{
    online:boolean;
    isActivo:boolean;
};
