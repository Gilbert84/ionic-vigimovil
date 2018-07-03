import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { GlobalService } from '../../global/global.service';

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
    public globalService:GlobalService
  ) {

  }

  agregarViaje(viaje) {
    this.viajes.push(viaje);
  }

  cargarStorage() {

    return new Promise ((resolve,reject)=>{

      if(this.globalService.android){
        //dispositivo
        this.storage.get('viaje').then((viaje)=>{
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
        if ( localStorage.getItem('viaje')) {
          this.viaje = JSON.parse( localStorage.getItem('viaje') );
          resolve(true);//si existe 
    
        } else {
          resolve(false);//no existe 
        }
      }

    });



  }

  guardarStorage( viaje ) {

    if(this.globalService.android){
      //dispositivo
      this.storage.set('viaje',JSON.stringify(viaje));

    }else{
      //escritorio
      localStorage.setItem('viaje', JSON.stringify(viaje) );
      console.log(viaje);

    }

    this.viaje = viaje;
    this.agregarViaje(this.viaje);

  }


}
