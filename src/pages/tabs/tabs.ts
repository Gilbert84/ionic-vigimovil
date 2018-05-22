import { Component } from '@angular/core';
import { IonicPage,NavController,AlertController} from 'ionic-angular';
import { VehiclePage, CounterPage , LoginPage} from '../index.pages'
import { WebsocketService } from '../../providers/websocket/websocket.service';
import { UbicacionService } from '../../providers/plugins/plugins.service.index';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1:any=VehiclePage;
  tab2:any=CounterPage;



  constructor(
              private ws:WebsocketService,
              private navCtrl:NavController,
              private alertCtrl:AlertController,
              ) {
                
    this.tab1=VehiclePage;
    this.tab2=CounterPage;


    ws.messages.subscribe(data => {			
      //console.log("tabs" , data);
    },(error)=>{
      this.alertCtrl.create({
        title: 'Contador pasajeros',
        subTitle:"No se encontro el dispositivo",
        buttons:["Ok!"]
      }).present();
      console.log('error: ',error);
    });

  }


  cerrarSession(){
    this.navCtrl.setRoot(LoginPage);
  }


}
