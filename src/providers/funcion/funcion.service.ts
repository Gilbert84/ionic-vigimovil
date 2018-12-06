import { Injectable } from '@angular/core';
import { Platform, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class FuncionService {

    
    public android:boolean;

    constructor(
            private platform:Platform,
            private toastCtrl:ToastController,
            private alertCtrl:AlertController,
            private storage:Storage
        ){

        this.obtenerEntorno();
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

    async guardarStorage( etiqueta :string, objecto: object ) {

        if(this.android){
          //dispositivo
          this.storage.set(etiqueta,JSON.stringify(objecto));
        }else{
          //escritorio
          localStorage.setItem(etiqueta, JSON.stringify(objecto) );
        }
        return objecto;
    }


    async cargarStorage(etiqueta:string) {

        if(this.android){
        //dispositivo
            this.storage.get(etiqueta).then((objeto)=>{
                if(objeto){
                    return JSON.parse( objeto );
                //existe 
                }else{
                //no existe
                    return;
                }
            });
        }else{
        //escritorio
            if ( localStorage.getItem(etiqueta)) {
                return JSON.parse( localStorage.getItem(etiqueta) );
                //si existe 
            } else {
                //no existe 
                return;
            }
        }
    }

    async borrarStorage(etiqueta:string){
        if(this.android){
            this.storage.remove(etiqueta);
        }else{
            localStorage.removeItem(etiqueta);
        }
    }

}