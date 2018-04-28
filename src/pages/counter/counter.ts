import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CounterEventPage } from './indexCounter.pages';
import { UserService } from '../../providers/user/user.service';
/**
 * Generated class for the CounterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-counter',
  templateUrl: 'counter.html',
})
export class CounterPage {

  counterEventPage=CounterEventPage;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserService) {
  }

  openPage(page:any){
    this.navCtrl.push(page);

  }


}
