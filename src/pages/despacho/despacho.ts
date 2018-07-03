import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { OperarioService } from '../../providers/operario/operario.service';
import { DispositivoService } from '../../providers/dispositivo/dispositivo.service';
import { SocketIoService } from '../../providers/socket-io/socket-io.service';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the DespachoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-despacho',
  templateUrl: 'despacho.html',
})
export class DespachoPage {

  gaugeType = "semi";
  //gaugeValue = 28.3;
  //gaugeLabel = "Speed";
  gaugeAppendText = "";
  gaugethick=10;
  gaugeSize=120;
  gaugeMaxMinutos=120;
  gaugeMaxDistancia= 100;
  gaugeMaxControles= 20;

  viaje:any;
  cargando: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl:LoadingController,
    public _dispositivoService:DispositivoService,
    public operarioService: OperarioService,
    public SocketIoService:SocketIoService) 
    {
      if(this.viaje === undefined){
        this.cargando= true;
      }

      let loading;
      if(this.cargando){
        loading=this.loadingCtrl.create({
          content:"esperando nuevo viaje espere por favor..."
        });
    
        loading.present();
      }

      this.SocketIoService.observar('dispositivoMensajePrivado').subscribe((data) =>{
        this.viaje = data.viaje;
        this.cargando = false;
        loading.dismiss();
        console.log('nuevo mensaje despacho',this.viaje);
      });

    //this.io.enviarEvento('obtenerViajeOperario',this.operarioService.operario).then();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DespachoPage');
  }

  iniciarViaje() {
    this.navCtrl.push(TabsPage);
  }

}
