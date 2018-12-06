import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { Operario } from '../../models/operario.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConfigService } from '../config/config.service';
import { SocketIoService } from '../socket-io/socket-io.service';
import { FuncionService } from '../funcion/funcion.service';

@Injectable()
export class OperarioService {

  token: string;
  operario: Operario = new Operario();


//todo lo que haya en el constructor hay que proveerlo en app-modules
  constructor(
               private storage:Storage,
               private platform: Platform,
               public http: HttpClient,
               private configService:ConfigService,
               private socketIoService:SocketIoService,
               private funcionService: FuncionService
             ){
  }

  login( operario: Operario) {


    let url = this.configService.configuracion.serverIp + '/operario/login';
 
      return this.http.post( url, operario )
                .map( (resp: any) => {
                  if(resp.ok){
                    this.guardarStorage( resp.operario);  
                  }
                  return resp;
                });
  }

  conectar(operario:Operario){
    return this.socketIoService.enviarEvento('conectarOperario',operario).then((resp:any) => {
      if(resp.ok){
        this.guardarStorage(resp.operario).then();
        this.guardarToken(resp.token).then();
        return resp.operario;
      }else{
        return Promise.reject(resp);
      }
    });
  }


  cargarStorage() {
    return this.funcionService.cargarStorage('operario').then((operario:Operario)=>{
      return this.operario = operario;
    });
  }

  guardarStorage( operario: Operario ) {
    return this.funcionService.guardarStorage('operario',operario).then((operario:Operario)=>{
      this.operario = operario;
      return this.operario;
    });
  }

  cargarToken(){
    return this.funcionService.cargarStorage('token').then((token:any)=>{
      return this.token = token.token;
    });
  }

  guardarToken(token:object){
    return this.funcionService.guardarStorage('token',token).then((token:any)=>{
      this.token = token.token;
      return this.token;
    });
  }

  borrarOperario(){
    this.funcionService.borrarStorage('token').then();
    this.funcionService.borrarStorage('operario').then();
  }

  // cargarStorage() {

  //   return new Promise ((resolve,reject)=>{

  //     if(this.platform.is('cordova')){
  //       //dispositivo
  //       this.storage.get('operario').then((operario)=>{
  //         if(operario){
  //           this.id=operario.id;
  //           this.token=operario.token;
  //           this.operario= JSON.parse( operario );
  //           resolve(true);
  //         }else{
  //           resolve(false);
  //         }
  //       });

  //     }else{
  //       //escritorio
  //       if ( localStorage.getItem('token')) {
  //         this.token = localStorage.getItem('token');
  //         this.operario = JSON.parse( localStorage.getItem('operario') );
  //         resolve(true);//si existe 
    
  //       } else {
  //         this.token = '';
  //         this.operario = null;
  //         resolve(false);//no existe 
  //       }
  //     }

  //   });



  // }

  // guardarStorage( id: string, token: string, operario: Operario ) {

  //   if(this.platform.is('cordova')){
  //     //dispositivo
  //     this.storage.set('id',id);
  //     this.storage.set('token',token);
  //     this.storage.set('operario',JSON.stringify(operario));

  //   }else{
  //     //escritorio
  //     localStorage.setItem('id', id );
  //     localStorage.setItem('token', token );
  //     localStorage.setItem('operario', JSON.stringify(operario) );

  //   }

  //   this.id=id;
  //   this.token = token;
  //   this.operario = operario;

  // }




}

