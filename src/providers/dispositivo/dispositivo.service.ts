import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SocketIoService } from '../socket-io/socket-io.service';
import { PermissionService } from '../plugins-nativos/permission/permission.service'
import { Dispositivo } from '../../interfaces/dispositivo.interface';
import { URL_SERVICIOS } from '../../config/url.servicios.config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DispositivoService {

  dispositivo :Dispositivo= {
    uuid: '2',
    mac:'mac',
    imei:'imei',
    imsi:'imsi',
    iccid:'iccid',
    nombre: 'K900',
    categoria:'TABLET',
    activo:false
  };

  constructor(
                public io: SocketIoService,
                private permission:PermissionService,
                public http: HttpClient,
                private platform:Platform,
                private storage:Storage
              ){

      this.io.observarDespacho().subscribe((evento)=>{

    });
  }

  registarDispositivo(){
    this.io.registrarDispositivo(this.dispositivo).then((resp:any)=>{
      console.log('resp:',resp);
      this.guardarStorage(resp.server.dispositivo);
    }).catch((error)=>{
      console.log('error:',error)
    });

  }


  uid(){
    return this.permission.getUid()
               .then((uid)=>{
                 console.log('uid:',uid);
                 this.dispositivo.uuid=uid.uuid;
                }).catch((err)=>{
                 console.log('error:',err);
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

      if(this.platform.is('cordova')){
        //dispositivo
        this.storage.get('dispositivo').then((dispositivo)=>{
          if(dispositivo){
            console.log(dispositivo);
            this.dispositivo=dispositivo;
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
          this.dispositivo = null;
          resolve(false);//no existe 
        }
      }

    });



  }

  guardarStorage( dispositivo: Dispositivo ) {

    if(this.platform.is('cordova')){
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
