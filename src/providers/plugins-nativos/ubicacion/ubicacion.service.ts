import { Injectable } from '@angular/core';
import { Geolocation } from '../plugins.service.index';
import { Geoposition } from '@ionic-native/geolocation';
import { DispositivoService } from '../../dispositivo/dispositivo.service';

@Injectable()
export class UbicacionService {

  geoposicion:Geoposition;


  constructor(
                private geolocation:Geolocation,
              ){

  }


  // iniciarUbicacion(){

  //   this.geolocation.getCurrentPosition().then((ubicacionInstante)=>{
  //     this.geoposicion=ubicacionInstante;
  //     this.geolocation.watchPosition().subscribe((geoposicion)=>{
  //       this.geoposicion=geoposicion;
  //     });

  //   }).catch((error)=>{
  //     console.log(error);
  //     return new Error('error')
  //   });
  // }

  // obtenerUbicacion(){
  //   this.geolocation.getCurrentPosition().then((geoposicion)=>{

  //   }).catch((error)=>{
  //     console.log(error);
  //     return new Error('error');
  //   });
  // }

}
