import { Injectable } from '@angular/core';
import { Platform, ToastController, AlertController } from 'ionic-angular';
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
            private toastCtrl:ToastController,
            private alertCtrl:AlertController
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
        return this.android;
    }

    crearToast(mensaje:string,duracion:number){
        this.toastCtrl.create({
            message:mensaje,
            duration:duracion
        }).present();
    }

    crearAlerta(titulo:string,subtitulo:string,mensaje?:string){
        this.alertCtrl.create({
            title:titulo,
            subTitle:subtitulo,
            message:mensaje ||'',
            buttons:["Ok!"]
        }).present();
    }

}