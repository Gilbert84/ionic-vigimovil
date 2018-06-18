import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { SocketIoService } from '../socket-io/socket-io.service';
import { Dispositivo } from '../../interfaces/dispositivo.interface';
import { URL_SERVICIOS } from '../../config/url.servicios.config';
import { GlobalService } from '../../global/global.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class DispositivoService {

  

  constructor(
                public io: SocketIoService,
                public http: HttpClient,
                private storage:Storage,
                private globalService:GlobalService
              ){

      this.io.observarDespacho().subscribe((evento)=>{

    });
  }

  registarDispositivo(){

    console.log('dispositivo:',this.globalService.dispositivo);
    if(!this.globalService.server.online){
      console.log('servidor fuera de linea');
      return;
    }

    this.io.registrarDispositivo(this.globalService.dispositivo).then((resp:any)=>{
      console.log('resp registro:',resp);
      this.guardarStorage(resp.server.dispositivo);
    }).catch((error)=>{
      console.log('error registro:',error)
    });

  }


  crearDispositivo( dispositivo: Dispositivo ) {

    let url = URL_SERVICIOS + '/dispositivo';

    return this.http.post( url, dispositivo )
              .map( (resp: any) => {

                //swal('Usuario creado', usuario.email, 'success' );
                return resp.usuario;
              })
              .catch( err => {
                //swal( err.error.mensaje, err.error.errors.message, 'error' );
                return Observable.throw( err );
              });
  }


  cargarStorage() {

    return new Promise ((resolve,reject)=>{

      if(this.globalService.android){
        //dispositivo
        this.storage.get('dispositivo').then((dispositivo)=>{
          if(dispositivo){
            console.log(dispositivo);
            this.globalService.dispositivo=dispositivo;
            resolve(true);//existe 
          }else{
            resolve(false);//no existe
          }
        });

      }else{
        //escritorio
        if ( localStorage.getItem('dispositivo')) {
          this.globalService.dispositivo = JSON.parse( localStorage.getItem('dispositivo') );
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

    this.globalService.dispositivo = dispositivo;

  }


}
