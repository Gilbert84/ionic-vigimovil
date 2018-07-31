import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CounterEventPage, QrScannerPage , } from './indexCounter.pages';
//import { UserService } from '../../providers/user/user.service';
import { CounterService } from '../../providers/counter/counter.service';
//import { TextoAVozService } from '../../providers/plugins-nativos/plugins.service.index';
import { AudioConteo } from '../../interfaces/audioConteo.interface';
import { EventoContador, Codigo } from '../../models/registro-contador.model';
//import { TextoAVozService } from '../../providers/plugins-nativos/plugins.service.index';




@IonicPage()
@Component({
  selector: 'page-counter',
  templateUrl: 'counter.html',
})
export class CounterPage {

  counterEventPage=CounterEventPage;
  qrScannerPage=QrScannerPage;
  public audioConteo:AudioConteo;

  gaugeType = "semi";
  //gaugeValue = 28.3;
  //gaugeLabel = "Speed";
  gaugeAppendText = "";
  gaugethick=10;
  gaugeSize=90;
  gaugeMax=150;

	private comando:EventoContador={
    tipo: 1,
    codigo: Codigo.limpiar,
    mensaje:'limpiar'
  }

  constructor (
      public navCtrl: NavController,
      public navParams: NavParams,
      //public io:SocketIoService,
      public contadorService:CounterService,
      //private textoAVozService:TextoAVozService
    ){
      this.audioConteo = this.contadorService.audiosConteo[0];

  }

  abrirOcerrarPuerta1(estado){
    if(!estado){
 
    }else{
   
    }
  }

  abrirOcerrarPuerta2(estado){
    if(!estado){
  
    }else{
 
    }
  }


  openPage(page:any){
    this.navCtrl.push(page);
  }

  ON_OFF_Audio(){
    
    if (this.audioConteo.reproducir){
      this.audioConteo.reproducir= false;
    }else{
      this.audioConteo.reproducir= true;
    }
    this.contadorService.reproducirAudio(this.audioConteo);
    //this.reiniciar();
  }


  reiniciar(){
    this.contadorService.enviarComando(this.comando);
    //this.textoAVozService.decir('Reinicio contador de pasajeros');
  }



}
