import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { GlobalService } from '../../global/global.service';
import { Storage } from '@ionic/storage';
 

@Injectable()
export class SocketIoService {

  socket_id: string;

  constructor( 
    private storage:Storage,
    public io: Socket,
    private _globalService:GlobalService,
    ){


    this.io.on('connect',(socket)=>{
      this._globalService.crearToast('Servidor en linea',2000);
      this._globalService.server={
        online:true,
        mensaje:'En linea'
      }
      this.socket_id = this.io.ioSocket.id;
      this.establecerConexion();
    });
    this.io.on('disconnect',()=>{
      this._globalService.crearToast('Servidor fuera de linea',2000);
      this._globalService.server={
        online:false,
        mensaje:'Fuera de linea'
      };
    });

    //this.observar('dispositivoMensajePrivado').subscribe((data) =>{
      //console.log('dispositivoMensajePrivado',data);
    //});

    //this.io.on('listaDispositivos', dispositivos =>{
      //console.log('listaDispositivos',dispositivos);
    //});
    //this.observar('listaDispositivos').subscribe( data =>{
      //console.log(data);
    //});
    
  }
//********************************************************* */
//                    enviar informacion
//********************************************************* */
  enviarEvento(audiencia:string, data: object) {
    return new Promise((resolve, reject) => {
      this.io.emit(audiencia, data, (resp: any) => {
        resolve(resp);
      });
    });
  }


  registrarDispositivo( dispositivo: object) {

    return new Promise((resolve, reject)=>{
      this.io.emit('registroDispositivo', dispositivo,( resp: any ) => {
          resolve(resp);
      });
    });
  }


  
//*********************************************************** */
//                escuchar informacion  
//*********************************************************** */
observar(audiencia: string) {
  return this.io.fromEvent<any>(audiencia).map(data => {
    return data;
  });
}


  observarEvento(nombreEvento:string) {
    return this.io.fromEvent<any>(nombreEvento)
                  .map(data => data );
  }

  observarDespacho() {
    return this.io.fromEvent<any>('mensajeDispositivo')
                  .map(data => data );
  }
    
  close() {
      this.io.disconnect();
  }


  establecerConexion() {

    return new Promise ((resolve,reject)=>{

      if(this._globalService.android){
        //dispositivo
        this.storage.get('dispositivo').then((dispositivo)=>{
          if(dispositivo){
            this.conectarAlServidor(JSON.parse(dispositivo));
            resolve(true);//existe 
          }else{
            resolve(false);//no existe
          }
        });

      }else{
        //escritorio
        if ( localStorage.getItem('dispositivo')) {
          let dispositivo = JSON.parse( localStorage.getItem('dispositivo') );
          this.conectarAlServidor(dispositivo);
          resolve(true);//si existe 
        } else {
          resolve(false);//no existe 
        }
      }

    });
  }

  conectarAlServidor(dispositivo) {
    this.enviarEvento('dispositivoConectado',dispositivo).then((resp) =>{
      //console.log(resp);
    });
  }


}
