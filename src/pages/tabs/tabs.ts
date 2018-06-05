import { Component } from '@angular/core';
import { IonicPage,NavController,AlertController} from 'ionic-angular';
import { VehiclePage, CounterPage , LoginPage} from '../index.pages'
import { WebsocketService } from '../../providers/websocket/websocket.service';
import { CounterService } from '../../providers/counter/counter.service';
import { UbicacionService } from '../../providers/plugins-nativos/plugins.service.index';



enum Estado {
	offline=0,
	online=1,
	netError=0
}


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1:any=VehiclePage;
  tab2:any=CounterPage;


  constructor(
              private navCtrl:NavController,
              private alertCtrl:AlertController,
              private contadorService:CounterService
              ) {
                
    this.tab1=VehiclePage;
    this.tab2=CounterPage;
    this.obtenerConteo();

    
  }


  obtenerConteo(){
    this.contadorService.contador
      .subscribe(
      (data)=>{
        console.log("tabs" , data);
      },
      (error)=>{
        console.log('error: ',error);
      },
      ()=>{
        console.log('se detuvo el observador');
        this.alertCtrl.create({
					title: 'Advertencia!!!',
					subTitle:"No se pudo establecer comunicacion con el dispositivo",
					buttons:["Ok!"]
				}).present();
        this.contadorService.contador.unsubscribe();
      }
    );
  }


	// enviarComando(cmd){
	// 	console.log('nuevo mensaje de la tablet al dispositivo: ', this.comando);
	// 	this.contadorService.contador.next(this.comando);
	// 	this.comando.mensaje = '';
	// }


  cerrarSession(){
    this.navCtrl.setRoot(LoginPage);
  }


}
