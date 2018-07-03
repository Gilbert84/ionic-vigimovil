import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { SocketIoService } from '../socket-io/socket-io.service';
import { URL_SERVICIOS } from '../../config/url.servicios.config';
import { GlobalService } from '../../global/global.service';

import { Observable } from 'rxjs/Observable';
import { Dispositivo } from '../../models/dispositivo.model';
import { UbicacionService } from '../plugins-nativos/ubicacion/ubicacion.service';


@Injectable()
export class DispositivoService {

  dispositivo:Dispositivo = new Dispositivo();


  constructor(
                public io: SocketIoService,
                public http: HttpClient,
                private storage:Storage,
                private globalService:GlobalService,
                private _ubicacionService: UbicacionService
              ){

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

    this.dispositivo = new Dispositivo();
    this.dispositivo.geoposicion = this._ubicacionService.geoposicion;
    this.io.registrarDispositivo(this.dispositivo).then((resp:any)=>{
      this.guardarStorage(resp.server.dispositivo);
    }).catch((error)=>{
       return new Error(error);
    });

  }

  conectarDispositivo () {

    this.cargarStorage().then((existe)=>{
      if (existe){
        this.io.enviarEvento('dispositivoConectado',this.dispositivo).then((resp) =>{
          console.log(resp);
        });
      }
    })
    
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



}
