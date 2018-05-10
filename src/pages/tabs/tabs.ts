import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { VehiclePage,CounterPage } from '../index.pages'
import { WebsocketService } from '../../providers/websocket/websocket';



@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1:any=VehiclePage;
  tab2:any=CounterPage;


  constructor(private ws:WebsocketService) {
    this.tab1=VehiclePage;
    this.tab2=CounterPage;

    ws.messages.subscribe(data => {			
      //console.log("tabs" , data);
    });

  }


}
