import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { Operario } from '../../models/operario.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConfigService } from '../config/config.service';

@Injectable()
export class OperarioService {

  id:string=null;
  token: string;
  operario: Operario = new Operario();


//todo lo que haya en el constructor hay que proveerlo en app-modules
  constructor(
               private storage:Storage,
               private platform: Platform,
               public http: HttpClient,
               private configService:ConfigService
             ){
  }

  login( operario: Operario) {


    let url = this.configService.configuracion.serverIp + '/operario/login';
 
      return this.http.post( url, operario )
                .map( (resp: any) => {
                  if(resp.ok){
                    this.guardarStorage( resp.id, resp.token, resp.operario);  
                  }
                  return resp;
                });
  }

  cargarStorage() {

    return new Promise ((resolve,reject)=>{

      if(this.platform.is('cordova')){
        //dispositivo
        this.storage.get('operario').then((operario)=>{
          if(operario){
            this.id=operario.id;
            this.token=operario.token;
            this.operario= JSON.parse( operario );
            resolve(true);
          }else{
            resolve(false);
          }
        });

      }else{
        //escritorio
        if ( localStorage.getItem('token')) {
          this.token = localStorage.getItem('token');
          this.operario = JSON.parse( localStorage.getItem('operario') );
          resolve(true);//si existe 
    
        } else {
          this.token = '';
          this.operario = null;
          resolve(false);//no existe 
        }
      }

    });



  }

  guardarStorage( id: string, token: string, operario: Operario ) {

    if(this.platform.is('cordova')){
      //dispositivo
      this.storage.set('id',id);
      this.storage.set('token',token);
      this.storage.set('operario',JSON.stringify(operario));

    }else{
      //escritorio
      localStorage.setItem('id', id );
      localStorage.setItem('token', token );
      localStorage.setItem('operario', JSON.stringify(operario) );

    }

    this.id=id;
    this.token = token;
    this.operario = operario;

  }

  borrarOperario(){
    if(this.platform.is('cordova')){
      this.storage.remove('id');
      this.storage.remove('token');
      this.storage.remove('operario');
    }else{
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      localStorage.removeItem('operario');
    }
  }


}

