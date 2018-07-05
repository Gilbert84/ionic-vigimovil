import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OperarioService } from '../../providers/operario/operario.service';
import { DispositivoService } from '../../providers/dispositivo/dispositivo.service';
import { SocketIoService } from '../../providers/socket-io/socket-io.service';
import { TabsPage } from '../tabs/tabs';
import { ViajeService } from '../../providers/viaje/viaje.service';
import { LoginPage } from '../index.pages';

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
    public _dispositivoService:DispositivoService,
    public operarioService: OperarioService,
    public SocketIoService:SocketIoService,
    public viajeService:ViajeService,
    public alertCtrl:AlertController) 
    {
     console.log('constructor despacho');
      this.viajeService.cargarViaje().then((existeViaje) =>{
        if(existeViaje){
          this.cargando = false;
          this.viaje = this.viajeService.viaje;
          console.log('viaje leido',this.viaje);
        }else{
          console.log('else');
        }
      });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DespachoPage');
  }


  iniciarViaje(){

    this.alertCtrl.create({
      title: 'Esta seguro de continuar!',
      buttons:[
        {
          text:'cancelar',
          role:'cancel'
        },
        {
          text:'Continuar',
          handler: () =>{
            this.navCtrl.setRoot(TabsPage);
          }
        }
      ]
    }).present();

  }

  salirLogin() {
    this.operarioService.borrarOperario();
    this.navCtrl.setRoot(LoginPage);
  }

}
