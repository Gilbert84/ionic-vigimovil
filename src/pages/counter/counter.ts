import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CounterEventPage, QrScannerPage , } from './indexCounter.pages';
//import { UserService } from '../../providers/user/user.service';
import { CounterService , Comando } from '../../providers/counter/counter.service';
//import { TextoAVozService } from '../../providers/plugins-nativos/plugins.service.index';
import { AudioConteo } from '../../interfaces/audioConteo.interface';




@IonicPage()
@Component({
  selector: 'page-counter',
  templateUrl: 'counter.html',
})
export class CounterPage {

  counterEventPage=CounterEventPage;
  qrScannerPage=QrScannerPage;
  audioConteo:AudioConteo;

  estadoPuerta1:boolean=false;
  estadoPuerta2:boolean=false;
  
  gaugeType = "semi";
  //gaugeValue = 28.3;
  //gaugeLabel = "Speed";
  gaugeAppendText = "";
  gaugethick=10;
  gaugeSize=90;
  gaugeMax=150;

	private comando:Comando={
    tipo: 1,
    codigo: 2,
    mensaje:'reinicio'
  }

  constructor (
      public navCtrl: NavController,
      public navParams: NavParams,
      //public io:SocketIoService,
      private contadorService:CounterService,
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
    this.reiniciar();
  }


  reiniciar(){
    this.contadorService.enviarComando(this.comando);
    //this.textoAVozService.decir('Reinicio contador de pasajeros');
  }



}
