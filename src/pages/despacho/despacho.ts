import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Refresher, Platform } from 'ionic-angular';
import { OperarioService } from '../../providers/operario/operario.service';
import { DispositivoService } from '../../providers/dispositivo/dispositivo.service';
import { SocketIoService } from '../../providers/socket-io/socket-io.service';
import { TabsPage } from '../tabs/tabs';
import { ViajeService } from '../../providers/viaje/viaje.service';
import { LoginPage } from '../index.pages';
import { Viaje } from '../../models/viaje.model';

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
  gaugeSize=123;
  gaugeMaxMinutos=120;
  gaugeMaxDistancia= 100;
  gaugeMaxControles= 20;
  


  constructor(
    private platform: Platform,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _dispositivoService:DispositivoService,
    public operarioService: OperarioService,
    public socketIoService:SocketIoService,
    public viajeService:ViajeService,
    public alertCtrl:AlertController) 
    {
      this.gaugeSize = Math.floor(this.platform.height()/10);

  }

  ionViewDidLoad() {
    // this.viajeService.cargarViaje().then((existeViaje)=>{
    //   if ( existeViaje ) {
    //     this.viajeService.tiempoDisponibleIncioViaje();
    //     this.viajeService.cuentaAtras();
    //   }
    // });
    this.viajeService.obtenerViajesPorAsignacion(this.viajeService.asignacion);
  }

  viajeSel(viaje:Viaje){
    console.log(viaje);
    this.viajeService.establecerViaje(viaje);
  }

  obtenerViajes(recargar:Refresher){
    this.viajeService.obtenerViajesPorAsignacion(this.viajeService.asignacion).then((resp)=>{
      recargar.complete();
    });
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
              this.viajeService.iniciarViaje();
              //this.navCtrl.setRoot(TabsPage);
          }
        }
      ]
    }).present();

  }

  salirLogin() {

    this.alertCtrl.create({
      title: 'Esta seguro de cerrar cession!',
      buttons:[
        {
          text:'cancelar',
          role:'cancel'
        },
        {
          text:'Aceptar',
          handler: () =>{
            //this.operarioService.borrarOperario();
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    }).present();
  }

}
