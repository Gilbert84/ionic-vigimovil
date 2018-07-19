import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { GlobalService } from '../../global/global.service';
import { SocketIoService } from '../socket-io/socket-io.service';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ViajeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ViajeService {

  public viaje:any;
  viajes=[];
  public existe:boolean=false;

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public globalService:GlobalService,
    public socketIoService:SocketIoService
  ) {

  }
  observarNuevoViaje(){
    return new Observable ((nuevoViaje)=>{
      this.socketIoService.observar('asignarNuevoViaje').subscribe((data) =>{
        let viaje = data.viaje;
        this.guardarViaje(viaje).then(()=>{
          nuevoViaje.next(viaje);
        });

        switch(viaje.estado.codigo){
          case 0:
            this.globalService.crearAlerta('Nuevo despacho','Un nuevo despacho a sido asignado a este vehiculo');
          break;
          case 1:
            this.globalService.crearAlerta('Alerta','El despacho a sido actualizado');
          break;
        }
      });
    });
  }

  agregarViaje(nuevoViaje) {
    this.viajes.push(nuevoViaje);
    this.guardarViajesPorOperario(this.viajes);
  }

  cargarViaje() {

    return new Promise ((resolve,reject)=>{

      if(this.globalService.android){
        //dispositivo
        this.storage.get('viaje').then((viaje)=>{
          if(viaje){
            console.log('viaje leido:',viaje);
            this.viaje = viaje;
            this.existe= true;
            resolve(true);//existe 
          }else{
            this.existe= false;
            resolve(false);//no existe
          }
        });

      }else{
        //escritorio
        if ( localStorage.getItem('viaje')) {
          this.viaje = JSON.parse( localStorage.getItem('viaje') );
          this.existe= true;
          resolve(true);//si existe 
    
        } else {
          this.existe= false;
          resolve(false);//no existe 
        }
      }

    });
  }

  cargarViajes() {

    return new Promise ((resolve,reject)=>{

      if(this.globalService.android){
        //dispositivo
        this.storage.get('viajes').then((viaje)=>{
          if(viaje){
            console.log(viaje);
            this.viaje = viaje;

            resolve(true);//existe 
          }else{
            resolve(false);//no existe
          }
        });

      }else{
        //escritorio
        if ( localStorage.getItem('viajes')) {
          this.viaje = JSON.parse( localStorage.getItem('viajes') );
          resolve(true);//si existe 
    
        } else {
          resolve(false);//no existe 
        }
      }

    });
  }


  guardarViaje( viaje ) {
    return new Promise(resolve =>{
      if(this.globalService.android){
        //dispositivo
        this.storage.set('viaje',JSON.stringify(viaje)).then(() =>{
          this.viaje = viaje;
          this.existe= true;
          resolve(true);
        });
  
      }else{
        //escritorio
        localStorage.setItem('viaje', JSON.stringify(viaje) );
        console.log('viaje leido del storage',viaje);
        this.viaje = viaje;
        this.existe= true;
        resolve(true);
      }
    });

  }

  guardarViajesPorOperario( viajes ) {

    if(this.globalService.android){
      //dispositivo
      this.storage.set('viajes',JSON.stringify(viajes));

    }else{
      //escritorio
      localStorage.setItem('viaje', JSON.stringify(viajes) );
      console.log(viajes);

    }

    this.viajes = viajes;

  }

  iniciarViaje() {
    return new Promise((resolve) => {
      this.viaje.estado.mensaje='Aceptado';
      this.viaje.estado.codigo = 3;
      this.viaje.horaSalidaOperario = new Date();
      console.log(this.viaje);
      this.actualizarViajeEstado(this.viaje._id,this.viaje.estado).then((resp) =>{
        this.guardarViaje(this.viaje).then(()=>{
          resolve(resp);
        });
      });
    });
  }

  terminarViaje(viaje) {
    return new Promise((resolve) => {
      viaje.horallegadaOperario = new Date();
      viaje.estado.mensaje='Terminado';
      viaje.estado.codigo=4;
      this.actualizarViaje(viaje).then((resp) =>{
        this.borrarViaje().then((estaGuardado) =>{
          if(estaGuardado){
            resolve(resp);
          }else{
            console.log('no guardo');
          }
        });
      });
    });
  }

  actualizarViaje(viaje){
    return new Promise((resolve) =>{
      this.socketIoService.enviarEvento('actualizarViaje',viaje).then((resp) =>{
        resolve(resp);
      });
    });
  }

  actualizarViajeEstado(_id,estado){
    let data ={
      _id:_id,
      estado:estado
    };
    console.log(data);
    return new Promise((resolve) =>{
      this.socketIoService.enviarEvento('actualizarViajeEstado',data).then((resp) =>{
        resolve(resp);
      });
    });   
  }

  borrarViaje(){
    return new Promise(resolve =>{
      if(this.globalService.android){
        this.storage.remove('viaje').then(() =>{
          resolve({
            ok:true,
            mensaje:'viaje borrado con exito'
          });
        });
      }else{
        localStorage.removeItem('viaje');
        resolve({
          ok:true,
          mensaje:'viaje borrado con exito'
        });
      }
    });

  }
}
