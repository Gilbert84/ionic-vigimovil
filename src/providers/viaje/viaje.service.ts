import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { GlobalService } from '../../global/global.service';
import { SocketIoService } from '../socket-io/socket-io.service';

/*
  Generated class for the ViajeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ViajeService {

  viaje;
  viajes=[];

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public globalService:GlobalService,
    public SocketIoService:SocketIoService
  ) {

  }

  agregarViaje(nuevoViaje) {
    this.viajes.push(nuevoViaje);
    this.guardarViajesPorOperario(this.viajes);
  }

  cargarViaje() {

    return new Promise ((resolve,reject)=>{

      if(this.globalService.android){
        //dispositivo
        this.storage.get('viaje').then((viaje)=>{
          if(viaje){
            console.log('viaje leido:',viaje);
            this.viaje = viaje;

            resolve(true);//existe 
          }else{
            resolve(false);//no existe
          }
        });

      }else{
        //escritorio
        if ( localStorage.getItem('viaje')) {
          this.viaje = JSON.parse( localStorage.getItem('viaje') );
          resolve(true);//si existe 
    
        } else {
          resolve(false);//no existe 
        }
      }

    });
  }

  cargarViajes() {

    return new Promise ((resolve,reject)=>{

      if(this.globalService.android){
        //dispositivo
        this.storage.get('viajes').then((viaje)=>{
          if(viaje){
            console.log(viaje);
            this.viaje = viaje;

            resolve(true);//existe 
          }else{
            resolve(false);//no existe
          }
        });

      }else{
        //escritorio
        if ( localStorage.getItem('viajes')) {
          this.viaje = JSON.parse( localStorage.getItem('viajes') );
          resolve(true);//si existe 
    
        } else {
          resolve(false);//no existe 
        }
      }

    });
  }

  guardarViaje( viaje ) {

    if(this.globalService.android){
      //dispositivo
      this.storage.set('viaje',JSON.stringify(viaje));

    }else{
      //escritorio
      localStorage.setItem('viaje', JSON.stringify(viaje) );
      console.log('viaje leido del storage',viaje);

    }

    this.viaje = viaje;
    //this.agregarViaje(this.viaje);

  }

  guardarViajesPorOperario( viajes ) {

    if(this.globalService.android){
      //dispositivo
      this.storage.set('viajes',JSON.stringify(viajes));

    }else{
      //escritorio
      localStorage.setItem('viaje', JSON.stringify(viajes) );
      console.log(viajes);

    }

    this.viajes = viajes;

  }

  terminarViaje(viaje) {
    return new Promise((resolve) => {
      viaje.fechaHoraFin = new Date();
      console.log('terminando viaje',viaje);
      this.SocketIoService.enviarEvento('terminarViajeOperario',viaje).then((resp) =>{
        resolve(resp);
      });
    });

  }

  borrarViaje(){
    if(this.globalService.android){
      this.storage.remove('viaje');
    }else{
      localStorage.removeItem('viaje');
    }
  }


}
