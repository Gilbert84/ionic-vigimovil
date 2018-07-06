import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { LoginPage } from '../index.pages'



@IonicPage()
@Component({
  selector: 'page-acerca',
  templateUrl: 'acerca.html',
})
export class AcercaPage {

  autoInicio:boolean=true;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcercaPage');
  }

  salir(){
    this.navCtrl.setRoot(LoginPage);
  }

}
