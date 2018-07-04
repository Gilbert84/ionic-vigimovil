import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { SocketIoService } from '../socket-io/socket-io.service';
import { URL_SERVICIOS } from '../../config/url.servicios.config';
import { GlobalService } from '../../global/global.service';

import { Observable } from 'rxjs/Observable';
import { Dispositivo, Geoposicion } from '../../models/dispositivo.model';
import { UbicacionService } from '../plugins-nativos/ubicacion/ubicacion.service';
import { Geolocation } from '../plugins-nativos/plugins.service.index';
import { Geoposition } from '@ionic-native/geolocation';


@Injectable()
export class DispositivoService {

  dispositivo:Dispositivo = new Dispositivo();
  geoposicion:Geoposition;
  cargando:boolean = true;

  constructor(
                public io: SocketIoService,
                public http: HttpClient,
                private storage:Storage,
                private globalService:GlobalService,
                private geolocation:Geolocation,
              ){

              if(this.geoposicion === undefined){
                this.cargando= true;
              }

      this.io.observarDespacho().subscribe((evento)=>{

    });


    this.io.observar('dispositivoMensajeTodos').subscribe((data) =>{
      console.log('dispositivoMensajeTodos',data);
    });
  }

  registarDispositivo(){


    if(!this.globalService.server.online){
      //console.log('servidor fuera de linea');
      return;
    }

    this.io.registrarDispositivo(this.dispositivo).then((resp:any)=>{
      this.guardarStorage(resp.server.dispositivo);
    }).catch((error)=>{
       return new Error(error);
    });

  }


  cargarStorage() {

    return new Promise ((resolve,reject)=>{

      if(this.globalService.android){
        //dispositivo
        this.storage.get('dispositivo').then((dispositivo)=>{
          if(dispositivo){
            console.log(dispositivo);
            this.dispositivo = dispositivo;

            resolve(true);//existe 
          }else{
            resolve(false);//no existe
          }
        });

      }else{
        //escritorio
        if ( localStorage.getItem('dispositivo')) {
          this.dispositivo = JSON.parse( localStorage.getItem('dispositivo') );
          console.log('obteniendo ')
          resolve(true);//si existe 
    
        } else {
          resolve(false);//no existe 
        }
      }

    });



  }

  guardarStorage( dispositivo: Dispositivo ) {

    if(this.globalService.android){
      //dispositivo
      this.storage.set('dispositivo',JSON.stringify(dispositivo));

    }else{
      //escritorio
      localStorage.setItem('dispositivo', JSON.stringify(dispositivo) );
      console.log(dispositivo);

    }

    this.dispositivo = dispositivo;

  }


  conectarDispositivo(){

    this.cargarStorage().then((existe)=>{
      if (existe){
        this.geolocation.getCurrentPosition().then((ubicacionInstante:Geoposition)=>{
          this.dispositivo.geoposicion=ubicacionInstante;
          this.geoposicion = ubicacionInstante;
          this.geolocation.watchPosition().subscribe((geoposicion:Geoposition)=>{
            if( geoposicion.coords.latitude === undefined || geoposicion.coords.longitude === undefined) {
              geoposicion.coords.latitude = 0;
              geoposicion.coords.longitude = 0;
            }else{
              this.dispositivo.geoposicion = geoposicion;
              this.geoposicion = geoposicion;
            }
            this.cargando= false;
            console.log('cambio ubicacion',this.dispositivo);

            this.io.enviarEvento('dispositivoConectado',this.dispositivo).then((resp) =>{
              //console.log(resp);
            });

          },(error) =>{
            //console.log('error en ubicacion',error);
            
          });
    
        },(err)=>{
          console.log('error en ubicacion 2',err);
        }).catch((error)=>{
          //console.log('error get en ubicacion',error);
          return new Error('error')
        });
      }
    });

  }

  obtenerUbicacion(){
    this.geolocation.getCurrentPosition().then((geoposicion:Geoposition)=>{

    }).catch((error)=>{
      console.log(error);
      return new Error('error');
    });
  }



}
