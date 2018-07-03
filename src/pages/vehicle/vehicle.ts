import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VehicleEventPage } from './indexVehicle.pages';
//import { OperarioService } from '../../providers/operario/operario.service';
import { ViajeService } from '../../providers/viaje/viaje';
import { DispositivoService } from '../../providers/dispositivo/dispositivo.service';
import { Dispositivo } from '../../models/dispositivo.model';



@IonicPage()
@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html',
})
export class VehiclePage {

  vehicleEventPage=VehicleEventPage;
  counter:{};

  zoom:number = 18;
  lat:number;
  lng:number;
  // 6.344757, -75.563122

  renderOptions: any = {
    draggable: false,
    suppressMarkers: true,
    suppressInfoWindows: true
  };

  markerOptions = {
    origin: {
        icon: 'assets/icon/origen.png',
        opacity: 0.8
    },
    destination: {
        icon: 'assets/icon/destino.png',
        opacity: 0.8,
    },
}

  transitOptions: string = 'TRANSIT';

  viaje={};
  cargando:boolean = true;
  visible:boolean = true;

  dispositivo:Dispositivo;

  constructor( 
              public navCtrl: NavController,
              public navParams: NavParams,
              public dispositivoService:DispositivoService,
              private viajeService:ViajeService
              ) {

              if (this.viaje === undefined){
                this.cargando = true;
              }

              this.viajeService.cargarStorage().then((existe) =>{
                if (existe){
                  this.cargando= false;
                  this.viaje = this.viajeService.viaje;
                }
              });

              this.dispositivo = this.dispositivoService.dispositivo;
              this.lat = this.dispositivoService.dispositivo.geoposicion.coords.latitude;
              this.lng = this.dispositivoService.dispositivo.geoposicion.coords.longitude;
              console.log('constructor vehiculo component',this.dispositivo );

  }

  openPage(page:any){
    this.navCtrl.push(page);
  }

  cambiarPuntosRef( evento ) {

  }

}
