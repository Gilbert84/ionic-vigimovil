import { Injectable } from '@angular/core';
import { Platform ,ToastController } from 'ionic-angular';
import { Dispositivo ,Server } from '../interfaces/dispositivo.interface';

@Injectable()
export class GlobalService {

    public dispositivo: Dispositivo;
    public server:Server;
    public android:boolean;

    constructor(
            private platform:Platform,
            private toastCtrl:ToastController
        ){
        this.dispositivo= {
            uuid: '2',
            mac:'mac',
            imei:'imei',
            imsi:'imsi',
            iccid:'iccid',
            nombre: 'K900',
            categoria:'TABLET',
            activo:false,
            img:''
        }

        this.server={
            online:false,
            mensaje:''
        }

        this.obtenerEntorno();
    }

    obtenerDatosDispositivo(){
        return ;
    }

    obtenerEntorno(){
        if(this.platform.is('cordova')){
            //dispositvo
            this.android=true;
        }else{
            //escritorio
            this.android=false;
        }
        console.log('Entorno:',this.android );
        return this.android;
    }

    crearMensaje(mensaje:string,duracion:number){
        this.toastCtrl.create({
            message:mensaje,
            duration:duracion
        }).present();
    }

}