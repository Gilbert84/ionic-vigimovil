import { Component } from '@angular/core';
import { IonicPage,NavController,AlertController, LoadingController} from 'ionic-angular';
import { VehiclePage, CounterPage, DespachoPage} from '../index.pages';
import { CounterService } from '../../providers/counter/counter.service';
import { OperarioService } from '../../providers/operario/operario.service';
//import { UbicacionService } from '../../providers/plugins-nativos/plugins.service.index';
import { Socket } from 'ng-socket-io';
import { SocketIoService } from '../../providers/socket-io/socket-io.service';
import { ViajeService } from '../../providers/viaje/viaje.service';
import { ConfigService } from '../../providers/config/config.service';




@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1:any=VehiclePage;
  tab2:any=CounterPage;

  viaje:any;
  operario:any;

  fechaHora:any;

  server = {
    online:false,
    mensaje:''
  }

  nuemeroViajes:number=0;

  constructor(
              private navCtrl:NavController,
              private alertCtrl:AlertController,
              private contadorService:CounterService,
              private operarioService:OperarioService,
              public io:Socket,
              public SocketIoService:SocketIoService,
              public viajeService:ViajeService,
              private loadingCtrl:LoadingController,
              private configService:ConfigService
              ) {
                this.SocketIoService.observar('dispositivoMensajePrivado').subscribe((data) =>{
                  console.log('nuevo app componnet',data);
                });

                
    this.tab1=VehiclePage;
    this.tab2=CounterPage;


    setInterval(()=>{
      this.fechaHora= new Date();
    },1000);

    this.operarioService.cargarStorage().then((operarioExiste) =>{
      if (operarioExiste){
        this.operario = this.operarioService.operario;
      }
    });

    this.viajeService.cargarViaje().then((viajeExiste) =>{
      if (viajeExiste){
        this.viaje = this.viajeService.viaje;
      }else{
        this.navCtrl.setRoot(DespachoPage);
      }
    });

    this.configService.cargarConfiguracion().then( (existe) =>{
      if(existe) {
        this.iniciarConteo();
      }else{
        this.alertCtrl.create({
					title: 'Advertencia!!!',
					subTitle:"No se ha configurado la ip del contador",
					buttons:["Ok!"]
				}).present();        
      }
    })
  }


  iniciarConteo(){
    this.contadorService.contador
      .subscribe(
      (data)=>{
        //console.log("tabs" , data);
      },
      (error)=>{
        //console.log('error: ',error);
      },
      ()=>{
        //console.log('se detuvo el observador');
        this.alertCtrl.create({
					title: 'Advertencia!!!',
					subTitle:"No se pudo establecer comunicacion con el dispositivo",
					buttons:["Ok!"]
				}).present();
        this.contadorService.contador.unsubscribe();
      }
    );
  }

  terminarViaje() {
    this.alertCtrl.create({
      title: 'Terminar viaje',
      subTitle:'esta seguro de terminar el viaje!!!',
      message: 'Para continuar ingrese su identificacion',
      inputs:[
        {
          name:'identificacion',
          placeholder:'Numero cedula',
          type:'number'
        }
      ],
      buttons:[
        {
          text:'cancelar',
          role:'cancel'
        },
        {
          text:'Aceptar',
          handler: (resp) => {
            let cc= parseInt(resp.identificacion);
            this.validarIdentificacion(cc);
          }
        }
      ]
    }).present();
  }


  validarIdentificacion(cc:number) {
    let loading=this.loadingCtrl.create({
      content:"Verificando espere por favor..."
    });

    loading.present();
    if( cc === this.operario.identificacion){
      loading.dismiss();
      this.viajeService.terminarViaje(this.viaje).then((resp)=>{
        this.viajeService.borrarViaje();
        this.navCtrl.setRoot(DespachoPage);
      });
    }else {
      loading.dismiss();
      this.alertCtrl.create({
        title: 'Identificacion Incorrecta',
        subTitle:"Por favor verifique que este bien digitada",
        buttons:["Ok!"]
      }).present();
    }
  }



}
