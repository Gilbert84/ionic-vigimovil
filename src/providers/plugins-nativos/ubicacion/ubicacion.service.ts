import { Injectable } from '@angular/core';
import { Geolocation } from '../plugins.service.index';
import { Geoposition } from '@ionic-native/geolocation';

@Injectable()
export class UbicacionService {

  geoposicion:Geoposition;

  coords={
    latitude:6.344620,
    longitude:-75.562874
  };
  

  constructor(
                private geolocation:Geolocation
              ){

  }


  iniciarUbicacion(){

    this.geolocation.getCurrentPosition().then((ubicacionInstante)=>{
      this.geoposicion=ubicacionInstante;
      this.geolocation.watchPosition().subscribe((geoposicion)=>{
        this.geoposicion=geoposicion;
        this.coords.latitude=geoposicion.coords.latitude;
        this.coords.longitude=geoposicion.coords.longitude;
        console.log(this.geoposicion.coords);
      });

    }).catch((error)=>{
      console.log(error);
      return new Error('error')
    });
  }

  obtenerUbicacion(){
    this.geolocation.getCurrentPosition().then((geoposicion)=>{

    }).catch((error)=>{
      console.log(error);
      return new Error('error');
    });
  }

}
