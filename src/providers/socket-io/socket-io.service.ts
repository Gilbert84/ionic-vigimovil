import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { SocketIO } from '../../models/socketIO.model';
import { FuncionService } from '../funcion/funcion.service';




@Injectable()
export class SocketIoService {

  socketIO:SocketIO = new SocketIO();
  subObservarEstadoConexion:Subscription = new Subscription();

  constructor( 
    public io: Socket,
    private funcionService:FuncionService,
    ){
    this.subObservarEstadoConexion = this.observarEstadoConexion().subscribe();
  }




  //********************************************************* */
  //                    enviar informacion
  //********************************************************* */
  enviarEvento(audiencia:string, data: object):any {
    return new Promise((resolve, reject):any => {
      this.io.emit(audiencia, data, (resp: any) => {
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

  close() {
    this.io.disconnect();
  }


  observarEstadoConexion(){

    return new Observable((estado)=>{

      this.io.on('connect',(socket)=>{
        this.funcionService.crearToast('Servidor en linea',2000);
        this.socketIO = new SocketIO({
          conectado:this.io.ioSocket.connected,
          desconectado:this.io.ioSocket.disconnected,
          id: this.io.ioSocket.id,
          mensaje:'En Linea',
          icono:'checkmark-circle',
          color:'secondary'
        });
        estado.next(this.socketIO);
      });

      this.io.on('disconnect',()=>{
        this.funcionService.crearToast('Servidor fuera de linea',2000);
        this.socketIO = new SocketIO({
          conectado:this.io.ioSocket.connected,
          desconectado:this.io.ioSocket.disconnected,
          id: this.io.ioSocket.id,
          mensaje:'Fuera de linea',
          icono:'close-circle',
          color:'danger'
        });
        estado.next(this.socketIO);
      });

    });

  }

  cerrarSubsObservarConexion(){
    this.subObservarEstadoConexion.unsubscribe();
  }

}
