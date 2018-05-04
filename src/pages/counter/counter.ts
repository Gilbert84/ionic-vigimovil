import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CounterEventPage } from './indexCounter.pages';
import { UserService } from '../../providers/user/user.service';
import { SocketIoService } from '../../providers/socket-io/socket-io';
import { WebsocketService } from '../../providers/websocket/websocket';


@IonicPage()
@Component({
  selector: 'page-counter',
  templateUrl: 'counter.html',
})
export class CounterPage {

  counterEventPage=CounterEventPage;

  contador={};
  date:any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public io:SocketIoService,
              private ws:WebsocketService,
              private userService: UserService) {


             // ws.messages.subscribe(data => {		
             //   this.contador=data;
             // });
  }

  openPage(page:any){
    this.navCtrl.push(page);

  }


}
