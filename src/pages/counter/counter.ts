import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CounterEventPage } from './indexCounter.pages';
//import { UserService } from '../../providers/user/user.service';
import { SocketIoService } from '../../providers/socket-io/socket-io.service';
import { WebsocketService } from '../../providers/websocket/websocket.service';
import { AudioConteo } from '../../interfaces/audioConteo.interface';


@IonicPage()
@Component({
  selector: 'page-counter',
  templateUrl: 'counter.html',
})
export class CounterPage {

  counterEventPage=CounterEventPage;
  audioConteo:AudioConteo;


  constructor (
                public navCtrl: NavController,
                public navParams: NavParams,
                public io:SocketIoService,
                private ws:WebsocketService,
              ) 
              {

              this.audioConteo = this.ws.audiosConteo[0];


             // ws.messages.subscribe(data => {		
             //   this.contador=data;
             // });
  }

  openPage(page:any){
    this.navCtrl.push(page);

  }

  ON_OFF_Audio(){
    if (this.audioConteo.reproducir){
      this.ws.reproducirAudio(this.audioConteo);
      this.audioConteo.reproducir= false;
    }else{
      this.ws.reproducirAudio(this.audioConteo);
      //this.ws.pausarAudio(this.audioConteo);
      this.audioConteo.reproducir= true;
    }
  }


}
