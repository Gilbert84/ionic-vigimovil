import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { FuncionService } from '../../providers/funcion/funcion.service';
import { SocketIoService } from '../socket-io/socket-io.service';
import { CounterService } from '../counter/counter.service';
import { Viaje , Codigo , Mensaje} from '../../models/viaje.model';
import { Asignacion } from '../../models/asignacion.model';

/*
  Generated class for the ViajeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ViajeService {

  public viajes:Viaje[] = [];
  public viaje:Viaje = new Viaje();
  public asignacion:Asignacion = new Asignacion();

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public funcionService:FuncionService,
    public socketIoService:SocketIoService,
    public counterService:CounterService
  ) {
    this.observarActualizarAsignacion();
    this.observarViajesPorAsignacion();
  }

  obtenerAsignacionPorVehiculo(vehiculo):Promise<Asignacion>{
    return this.socketIoService.enviarEvento('obtenerAsignacionPorVehiculo',vehiculo).then((resp)=>{
      if(resp.ok){
        this.asignacion = resp.asignacion;
        return this.asignacion;
      }else{
        this.funcionService.crearAlerta('Asignacion',resp.mensaje);
        return Promise.reject(resp);
      }
    });
  }

  obtenerViajesPorAsignacion(asignacion:Asignacion){
    return this.socketIoService.enviarEvento('obtenerDespachosPorAsignacionConPendiente',asignacion).then((resp)=>{
      console.log(resp);
      if(resp.ok){
        this.viajes = resp.despachos;
        return this.viajes;
      }else{
        return Promise.reject(resp);
      }
    });
  }

  observarViajesPorAsignacion(){
    this.socketIoService.observar('despachosPorAsignacionConPendiente').subscribe((resp) =>{
      if(resp.ok){
        this.viajes = resp.despachos;
        this.funcionService.crearToast(resp.mensaje,2000);
      }
    });
  }

  observarActualizarAsignacion(){

    this.socketIoService.observar('actualizarAsignacion').subscribe((asignacion:Asignacion)=>{
        this.asignacion = asignacion;
        this.guardarAsignacionStorage(this.asignacion);
    });
  }

  establecerViaje(viaje:Viaje){
    this.viaje= new Viaje(viaje);
    return this.guardarViajeStorage(this.viaje).then((viaje:Viaje) =>{
      if(viaje){
        this.funcionService.crearToast('Viaje guardado',2000);
      }
      return viaje;
    });
  }

  obtenerAsignacionStorage() {
    return this.funcionService.cargarStorage('asignacion').then((asignacion:Asignacion)=>{
      this.asignacion = asignacion;
      return this.asignacion;
    });
  }

  guardarAsignacionStorage( asignacion:Asignacion ) {
    return this.funcionService.guardarStorage('asignacion',asignacion).then((asignacion:Asignacion)=>{
      this.asignacion = asignacion;
      return this.asignacion;
    });
  }

  obtenerViajeStorage() {
    return this.funcionService.cargarStorage('viaje').then((viaje:Viaje)=>{
      return this.viaje = viaje;
    });
  }

  guardarViajeStorage( viaje:Viaje ) {
    return this.funcionService.guardarStorage('viaje',viaje).then((viaje:Viaje)=>{
      this.viaje = viaje;
      return this.viaje;
    });
  }

  obtenerViajesStorage() {
    return this.funcionService.cargarStorage('viajes').then((viajes:Viaje[])=>{
      return this.viajes = viajes;
    });
  }

  guardarViajesStorage( viajes:Viaje[] ) {
    return this.funcionService.guardarStorage('viajes',viajes).then((viajes:Viaje[])=>{
      this.viajes = viajes;
      return this.viajes;
    });
  }

  tiempoDisponibleIncioViaje() {
    let horas_seg_Actualizado = new Date().getHours() * 3600;
    let min_segundos_Actualizado = new Date().getMinutes() * 60;
    let total_seg_actualizado = horas_seg_Actualizado + min_segundos_Actualizado + new Date().getSeconds();
    let horas_seg_horaSalida = new Date(this.viaje.horaSalidaAsignada).getHours() * 3600;
    let min_seg_horaSalida = new Date(this.viaje.horaSalidaAsignada).getMinutes()  * 60;
    let total_seg_horaSalida = horas_seg_horaSalida + min_seg_horaSalida + new Date(this.viaje.horaSalidaAsignada).getSeconds();
    return  total_seg_horaSalida - total_seg_actualizado;
  }

  cuentaAtras(tiempoDisponible) {

    const salir = setInterval(() => {
      if (tiempoDisponible <= 1) {
        tiempoDisponible = 0;
        clearInterval(salir);
      }else{
        tiempoDisponible-= 1;
      }
    }, 1000);
  }


  iniciarViaje() {
    this.viaje.estado.codigo = Codigo.aceptado;
    this.viaje.estado.mensaje = Mensaje.aceptado;
    this.viaje.horaSalidaOperario = new Date();
    return this.actualizarViaje(this.viaje);
  }

  terminarViaje(viaje) {
      viaje.horallegadaOperario = new Date();
      viaje.estado.mensaje='Terminado';
      viaje.estado.codigo=4;
      viaje.pasajeros.salidasPuerta1 = this.counterService.registroActual.ch1Out;
      viaje.pasajeros.salidasPuerta2 = this.counterService.registroActual.ch1Out;
      viaje.pasajeros.ingresosPuerta1 = this.counterService.registroActual.ch1In;
      viaje.pasajeros.ingresosPuerta2 = this.counterService.registroActual.ch2In;
  }

  actualizarViaje(viaje):Promise<any>{

    return  this.socketIoService.enviarEvento('actualizarDespacho',viaje).then((resp) =>{
      this.funcionService.crearToast(resp.mensaje,2000);
      return resp;
    });

  }


}
