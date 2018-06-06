import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CounterService } from '../../../providers/counter/counter.service';


@IonicPage()
@Component({
  selector: 'page-counter-event',
  templateUrl: 'counter-event.html',
})
export class CounterEventPage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private contadorService:CounterService
    ){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CounterEventPage');
  }

}
