import { Component } from '@angular/core';
import { IonicPage,NavController,AlertController} from 'ionic-angular';
import { VehiclePage, CounterPage , LoginPage, DespachoPage} from '../index.pages';
import { CounterService } from '../../providers/counter/counter.service';
import { OperarioService } from '../../providers/operario/operario.service';
//import { UbicacionService } from '../../providers/plugins-nativos/plugins.service.index';
import { Socket } from 'ng-socket-io';
import { SocketIoService } from '../../providers/socket-io/socket-io.service';
import { ViajeService } from '../../providers/viaje/viaje.service';




@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1:any=VehiclePage;
  tab2:any=CounterPage;

  viaje:any;

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
              public viajeService:ViajeService
              ) {
                this.nuemeroViajes= this.viajeService.viajes.length;
                console.log('numero viajes',this.nuemeroViajes );
                this.SocketIoService.observar('dispositivoMensajePrivado').subscribe((data) =>{
                  console.log('nuevo app componnet',data);
                });

                
    this.tab1=VehiclePage;
    this.tab2=CounterPage;
    this.obtenerConteo();

    setInterval(()=>{
      this.fechaHora= new Date();
    },1000);

    this.viajeService.cargarViaje().then((existe) =>{
      if (existe){
        this.viaje = this.viajeService.viaje;
      }
    });

    
  }


  obtenerConteo(){
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

  // cerrarSession(){
  //   //this.operarioService.borrarOperario();
  //   this.navCtrl.setRoot(LoginPage);
  // }

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
              console.log('saliendo de ruta',resp);
              this.navCtrl.setRoot(DespachoPage);
            });
            
          }
        }
      ]
    }).present();
  }






}
