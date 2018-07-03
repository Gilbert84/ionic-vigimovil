import { Injectable } from '@angular/core';
import { Platform ,ToastController } from 'ionic-angular';
import { Server } from '../interfaces/dispositivo.interface';

@Injectable()
export class GlobalService {

    public server:Server = {
        online:false,
        mensaje:''
    };
    public android:boolean;

    constructor(
            private platform:Platform,
            private toastCtrl:ToastController
        ){

        this.server= this.server;

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