import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VehicleEventPage } from './indexVehicle.pages';
import { UserService } from '../../providers/user/user.service';

/**
 * Generated class for the VehiclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


//usuario jcx295
//clave 1994,


@IonicPage()
@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html',
})
export class VehiclePage {

  vehicleEventPage=VehicleEventPage;
  counter:{};

  constructor( public navCtrl: NavController,
               public navParams: NavParams,
               private userService:UserService) {

  }

  openPage(page:any){
    this.navCtrl.push(page);
  }

}
