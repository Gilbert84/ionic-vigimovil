import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { SocketIoService } from '../socket-io/socket-io.service';
import { GlobalService } from '../../global/global.service';

import { Dispositivo, Geoposicion } from '../../models/dispositivo.model';
import { Geolocation } from '../plugins-nativos/plugins.service.index';
import { Geoposition } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { Subscription } from 'rxjs/Subscription';


@Injectable()
export class DispositivoService {

  dispositivo:Dispositivo = new Dispositivo();
  geoposicion:Geoposition = new Geoposicion();


  observarGeoposicion:Subscription;

  constructor(
                public io: SocketIoService,
                public http: HttpClient,
                private storage:Storage,
                private globalService:GlobalService,
                private geolocation:Geolocation,
                private device:Device
              ){

                console.log(device);

    this.io.observarDespacho().subscribe((evento)=>{

    });

    this.io.observar('dispositivoMensajeTodos').subscribe((data) =>{

    });
  }

  registarDispositivo(){

    return new Promise( (resolve,reject) =>{
      if(!this.globalService.server.online){
        resolve(false);
      }

      if (this.globalService.android){
        this.dispositivo.uuid = this.device.uuid;
        this.dispositivo.iccid = this.device.serial;
      } 


      this.io.registrarDispositivo(this.dispositivo).then((resp:any)=>{
        this.guardarStorage(resp.server.dispositivo);
        resolve(true);
      }).catch((error)=>{
         reject(error);
      });
    })
  }


  cargarStorage() {

    return new Promise ((resolve,reject)=>{

      if(this.globalService.android){
        //dispositivo
        this.storage.get('dispositivo').then((dispositivo)=>{
          if(dispositivo){
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
    }

    this.dispositivo = dispositivo;

  }


  conectarDispositivo(){

    this.cargarStorage().then((existe)=>{
      if (existe){
        this.geolocation.getCurrentPosition().then((ubicacionInstante:Geoposition)=>{
          this.dispositivo.geoposicion=ubicacionInstante;
          this.geoposicion = ubicacionInstante;
          this.observarGeoposicion = this.geolocation.watchPosition().subscribe((geoposicion:Geoposition)=>{

            if( !geoposicion.coords ) {
              return;
            }else{
              this.dispositivo.geoposicion = geoposicion;
              this.geoposicion = geoposicion;
            }

            this.io.enviarEvento('dispositivoConectado',this.dispositivo).then((resp) =>{
              //console.log(resp);
            });

          },
          (error) =>{
            this.globalService.crearToast(`error obteniendo ubicacion obs codigo: ${error.code}`,2000);
          });
        },
        (err)=>{
          this.globalService.crearToast(`error obteniendo ubicacion codigo: ${err.code}`,2000);
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
