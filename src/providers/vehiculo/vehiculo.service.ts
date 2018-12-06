
import { Injectable } from '@angular/core';
import { SocketIoService } from '../socket-io/socket-io.service';
import { DispositivoService } from '../dispositivo/dispositivo.service';
import { Vehiculo } from '../../models/vehiculo.model';
import { FuncionService } from '../funcion/funcion.service';

/*
  Generated class for the VehiculoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VehiculoService {

  vehiculo:Vehiculo = new Vehiculo();

  constructor(
    private socketIoService:SocketIoService,
    private dispositivoService:DispositivoService,
    private funcionService:FuncionService
    ) {
      this.observarActualizarVehiculo();
  }

  obtenerVehiculoPorDispositivo(){
  
    return this.socketIoService.enviarEvento('obtenerVehiculoPorDispositivo',this.dispositivoService.dispositivo).then((resp:any) => {
      if(resp.ok){
        this.vehiculo = resp.vehiculo;
        this.guardarStorage(this.vehiculo);
        return this.vehiculo;
      }else{
        this.funcionService.crearAlerta('Vehiculo',resp.mensaje);
        return Promise.reject(resp);
      }
    });
  }

  observarActualizarVehiculo(){
    this.socketIoService.observar('actualizarVehiculo').subscribe((resp)=>{
      this.vehiculo = resp.vehiculo;
      console.log(this.vehiculo);
      this.guardarStorage(this.vehiculo);
      return resp;
    });
  }

  cargarStorage() {
    return this.funcionService.cargarStorage('vehiculo').then((vehiculo:Vehiculo)=>{
      return this.vehiculo = vehiculo;
    });
  }

  guardarStorage( vehiculo: Vehiculo ) {
    return this.funcionService.guardarStorage('vehiculo',vehiculo).then((vehiculo:Vehiculo)=>{
      this.vehiculo = vehiculo;
      return this.vehiculo;
    });
  }

}
