import { Injectable } from '@angular/core';
import { Platform , ToastController } from 'ionic-angular';
//plugins que requieren permiso de uso
import {    
            Uid , 
            AndroidPermissions , 
            BatteryStatus , 
            AndroidFullScreen,
            Autostart,
            StatusBar 
        } from '../plugins.service.index';
import { stringify } from '@angular/compiler/src/util';


@Injectable()
export class PermissionService {

    public android:boolean;

    constructor(
        public  toastCtrl :ToastController,
        private androidPermissions:AndroidPermissions,
        private uid:Uid,
        private platform:Platform,
        private batteryStatus: BatteryStatus,
        private androidFullScreen:AndroidFullScreen,
        private autostart:Autostart,
        private statusBar:StatusBar
    ){
        if(platform.is('cordova')){
            //dispositvo
            this.android=true;
            this.fullScreen();
            this.autostart.enable();
            this.barraEstado();
  
        }else{
            //escritorio
            this.android=false;
        }

    }

    async getUid() {
        const { hasPermission } = await this.androidPermissions.checkPermission(
          this.androidPermissions.PERMISSION.READ_PHONE_STATE
        );
       
        if (!hasPermission) {

            const result = await this.androidPermissions.requestPermission(
            this.androidPermissions.PERMISSION.READ_PHONE_STATE
            );
       
            if (!result.hasPermission) {
                //throw new Error('Permissions required');
                this.mostrarMensaje('permiso requerido',2000);
            }
       
            // ok, a user gave us permission, we can get him identifiers after restart app
            return;
        }

        let uid={
            uuid:this.uid.UUID,
            imei:this.uid.IMEI,
            imsi:this.uid.IMSI,
            mac:this.uid.MAC,
            iccid:this.uid.ICCID
        }
       
        return uid;
    }

    // watch change in battery status
    statusBattery(){
        return this.batteryStatus.onChange().subscribe(status => {
            console.log(status.level, status.isPlugged);
        });
    }


    fullScreen(){
        this.androidFullScreen.isImmersiveModeSupported()
            .then(() => {
                this.mostrarMensaje('Soportado modo inmersivo',2000);
                this.androidFullScreen.immersiveMode()
                    .then((msg)=>{
                        this.mostrarMensaje('modo inmersivo activado',2000);
                    })
                    .catch((err)=>{
                        this.mostrarMensaje(JSON.stringify(err),3000);
                    })
            })
            .catch(err => console.log(err));
    }

    barraEstado(){
        if(this.statusBar.isVisible){
            this.statusBar.overlaysWebView(false);
            this.statusBar.hide();
            this.mostrarMensaje('barra de estado oculta',2000);
        }
    }


    mostrarMensaje(mensaje:string,duracion:number){

        this.toastCtrl.create({
            message:mensaje,
            duration:duracion
        }).present();
    }


}