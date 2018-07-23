import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { VehicleEventPage } from './indexVehicle.pages';
//import { OperarioService } from '../../providers/operario/operario.service';
import { ViajeService } from '../../providers/viaje/viaje.service';
import { DispositivoService } from '../../providers/dispositivo/dispositivo.service';
import { Dispositivo } from '../../models/dispositivo.model';
import { DespachoPage } from '../despacho/despacho';



@IonicPage()
@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html',
})
export class VehiclePage {

  vehicleEventPage=VehicleEventPage;
  counter:{};

  zoom:number = 14;
  lat:number;
  lng:number;
  // 6.344757, -75.563122

  gaugeType = "arch";
  //gaugeValue = 28.3;
  //gaugeLabel = "Speed";
  gaugeAppendText = "";
  gaugethick=10;
  gaugeSize=82;
  gaugeMax=150;

  renderOptions: any = {
    draggable: false,
    suppressMarkers: true,
    suppressInfoWindows: true
  };

  markerOptions = {
    origin: {
        icon: 'assets/icon/origen.png',
        opacity: 0.8
    },
    destination: {
        icon: 'assets/icon/destino.png',
        opacity: 0.8,
    },
}

  transitOptions: string = 'TRANSIT';

  viaje:any;
  cargando:boolean = true;
  visible:boolean = true;

  dispositivo:Dispositivo;

  constructor(
              private platform:Platform, 
              public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl:AlertController,
              public dispositivoService:DispositivoService,
              private viajeService:ViajeService
              ) {
              this.gaugeSize = Math.floor(platform.height()/6.5);
              this.viajeService.cargarViaje().then((existe) =>{
                if (existe){
                  this.cargando= false;
                  this.viaje = this.viajeService.viaje;
                  console.log('viaje actual:',this.viaje);
                }else{
                  this.navCtrl.setRoot(DespachoPage);
                }
              });

              this.dispositivo = this.dispositivoService.dispositivo;
              this.lat = this.dispositivoService.dispositivo.geoposicion.coords.latitude;
              this.lng = this.dispositivoService.dispositivo.geoposicion.coords.longitude;
              console.log('constructor vehiculo component',this.dispositivo );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad aapPage');
  }

  openPage(page:any){
    this.navCtrl.push(page);
  }

  cambiarPuntosRef( evento ) {

  }

  terminarViaje() {
    this.alertCtrl.create({
      title: 'Terminar viaje',
      subTitle:'esta seguro de terminar el viaje!!!',
      message: 'Para continuar ingrese su clave de usuario',
      inputs:[
        {
          name:'password',
          placeholder:'codigo',
          type:'password'
        }
      ],
      buttons:[
        {
          text:'cancelar',
          role:'cancel'
        },
        {
          text:'Ingresar',
          handler: () => {
            this.viajeService.terminarViaje(this.viaje).then((resp)=>{
              this.navCtrl.setRoot(DespachoPage);
            });
            
          }
        }
      ]
    }).present();
  }

}
