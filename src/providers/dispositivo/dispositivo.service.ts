import { Injectable } from '@angular/core';

import { Geolocation } from '../plugins-nativos/plugins.service.index';
import { Geoposition } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { Subscription } from 'rxjs/Subscription';

import { SocketIoService } from '../socket-io/socket-io.service';
import { FuncionService } from '../../providers/funcion/funcion.service';
import { Dispositivo } from '../../models/dispositivo.model';
import { SocketIO } from '../../models/socketIO.model';


@Injectable()
export class DispositivoService {

  dispositivo:Dispositivo;
  observarGeoposicion:Subscription;

  constructor(
      private geolocation:Geolocation,
      private device:Device,
      private socketIoService:SocketIoService,
      private funcionService:FuncionService,
    ){
                
  }

  registarDispositivo():any{

    return new Promise( (resolve,reject) =>{
      if(!this.socketIoService.socketIO.conectado){
        return reject({
          ok:false,
          mensaje:'no hay comunicacion con el servidor'
        });
      }

      if (this.funcionService.android){
        this.dispositivo.uuid = this.device.uuid;
        this.dispositivo.iccid = this.device.serial;
        this.dispositivo.nombre = this.device.model;
        this.dispositivo.categoria = this.device.platform;
      }else{
        this.dispositivo = new Dispositivo();
      }

      this.socketIoService.enviarEvento('crearDispositivo', this.dispositivo).then((resp:any)=>{
        if(resp.ok){
          this.guardarStorage(resp.dispositivo).then((dispositivo:Dispositivo)=>{
            this.dispositivo = dispositivo;
            this.observarEstadoConexion();
           return resolve(resp);
          });
        }else{
          this.funcionService.crearAlerta(resp.mensaje,resp.error.message);
          return reject(resp);
        }

      });
    });
  }

  obtenerDispositivo(dispositivo){
    return this.socketIoService.enviarEvento('obtenerDispositivo',dispositivo).then((resp)=>{
      return resp;
    });
  }

  actualizarDispositivo(dispositivo){
    return this.socketIoService.enviarEvento('actualizarDispositivo',dispositivo).then((resp)=>{
      return resp;
    });
  }

  observarActualizarDispositivo(){
    return this.socketIoService.observar('actualizarDispositivo').map((resp)=>{
      return resp;
    });
  }


  conectarDispositivo(dispositivo:Dispositivo) {
    this.socketIoService.enviarEvento('conectarDispositivo',dispositivo).then((resp:any) =>{
      if(resp.ok){
        this.funcionService.crearToast('dipsoitivo en  linea',2000);
      }
    });
  }

  observarEstadoConexion(){
    if(this.socketIoService.socketIO.conectado){
      this.conectarDispositivo(this.dispositivo);
    }
    this.socketIoService.observarEstadoConexion().subscribe((socketIO:SocketIO) =>{
      if(socketIO.conectado){
        this.conectarDispositivo(this.dispositivo);
      }
    });
  }



  cargarStorage() {
    return this.funcionService.cargarStorage('dispositivo').then((dispositivo:Dispositivo)=>{
      return this.dispositivo = dispositivo;
    });
  }

  guardarStorage( dispositivo: Dispositivo ) {
    return this.funcionService.guardarStorage('dispositivo',dispositivo).then((dispositivo:Dispositivo)=>{
      this.dispositivo = dispositivo;
      return this.dispositivo;
    });
  }

  observarEventos(){
    this.geolocation.getCurrentPosition().then((ubicacionInstante:Geoposition)=>{
      this.dispositivo.geoposicion=ubicacionInstante;
      this.observarGeoposicion = this.geolocation.watchPosition().subscribe((geoposicion:Geoposition)=>{

        if( !geoposicion.coords ) {
          return;
        }else{
          this.dispositivo.geoposicion = geoposicion;
        }

      },
      (error) =>{
        this.funcionService.crearToast(`error obteniendo ubicacion obs codigo: ${error.code}`,2000);
      });
    },
    (err)=>{
      this.funcionService.crearToast(`error obteniendo ubicacion codigo: ${err.code}`,2000);
    });
  }

  obtenerUbicacion(){
    this.geolocation.getCurrentPosition().then((geoposicion:Geoposition)=>{
      this.dispositivo.geoposicion = geoposicion;
    }).catch((error)=>{
      console.log(error);
      return new Error('error');
    });
  }



}
