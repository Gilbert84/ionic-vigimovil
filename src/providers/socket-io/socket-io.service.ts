import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { EstadoDispositivo } from '../../interfaces/dispositivo.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 

@Injectable()
export class SocketIoService {


  public online:boolean=false;

  constructor( private io: Socket ) {
    this.io.on('connect',()=>{
      this.online=true
    });
    this.io.on('disconnect',()=>{
      this.online=false;
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
