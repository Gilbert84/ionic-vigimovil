import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VehicleEventPage } from './indexVehicle.pages';
import { UbicacionService } from '../../providers/plugins-nativos/plugins.service.index';
//import { OperarioService } from '../../providers/operario/operario.service';
import { ViajeService } from '../../providers/viaje/viaje';



@IonicPage()
@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html',
})
export class VehiclePage {

  vehicleEventPage=VehicleEventPage;
  counter:{};

  zoom:number = 18;

  constructor( 
              public navCtrl: NavController,
              public navParams: NavParams,
              //private operarioService:OperarioService,
              private ubicacion:UbicacionService,
              private viajeService:ViajeService
              ) {
              console.log('constructor vehiculo component',this.viajeService.viaje);
              this.ubicacion.iniciarUbicacion();
  }

  openPage(page:any){
    this.navCtrl.push(page);
  }

}
