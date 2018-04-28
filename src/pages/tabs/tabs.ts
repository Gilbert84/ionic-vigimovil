import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { VehiclePage,CounterPage } from '../index.pages'

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1:any=VehiclePage;
  tab2:any=CounterPage;


  constructor() {
    this.tab1=VehiclePage;
    this.tab2=CounterPage;

  }


}
