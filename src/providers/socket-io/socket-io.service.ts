import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { GlobalService } from '../../global/global.service';
 

@Injectable()
export class SocketIoService {



  constructor( 
    public io: Socket,
    private GlobalService:GlobalService
    ){


    this.io.on('connect',()=>{
      this.GlobalService.crearMensaje('Servidor en linea',2000);
      this.GlobalService.server={
        online:true,
        mensaje:'En linea'
      }


    });
    this.io.on('disconnect',()=>{
      this.GlobalService.crearMensaje('Servidor fuera de linea',2000);
      this.GlobalService.server={
        online:false,
        mensaje:'Fuera de linea'
      }
    });
    
  }
//********************************************************* */
//                    enviar informacion
//********************************************************* */
  enviarEvento(nombreEvento:string, data: object) {

    this.io.emit(nombreEvento, data,( resp: any ) => {
      console.log('resp server:',resp);
      return resp;
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

  observarEvento(nombreEvento:string) {
        return this.io
            .fromEvent<any>(nombreEvento)
            .map(data => data );
  }

  observarDespacho() {
    return this.io
        .fromEvent<any>('mensajeDispositivo')
        .map(data => data );
  }
    
  close() {
      this.io.disconnect();
  }


}
