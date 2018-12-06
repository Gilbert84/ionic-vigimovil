import { Injectable } from '@angular/core';
import { FuncionService } from '../../funcion/funcion.service'
import { ToastController } from 'ionic-angular';
//plugins que requieren permiso de uso
import {    
            AndroidPermissions , 
            BatteryStatus , 
            AndroidFullScreen,
            StatusBar 
        } from '../plugins.service.index';


@Injectable()
export class PermissionService {

    constructor(
        private toastCtrl :ToastController,
        private androidPermissions:AndroidPermissions,
        private batteryStatus: BatteryStatus,
        private androidFullScreen:AndroidFullScreen,
        private statusBar:StatusBar,
        private funcionService:FuncionService
    ){
        if(this.funcionService.android){
            //dispositvo
            this.fullScreen();
            this.barraEstado();
  
        }else{
            //escritorio
            this.mostrarMensaje('Entorno de trabajo: Escritorio',5000);
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

        return ;

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