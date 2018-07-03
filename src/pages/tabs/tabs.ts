import { Component } from '@angular/core';
import { IonicPage,NavController,AlertController} from 'ionic-angular';
import { VehiclePage, CounterPage , LoginPage} from '../index.pages';
import { CounterService } from '../../providers/counter/counter.service';
import { OperarioService } from '../../providers/operario/operario.service';
//import { UbicacionService } from '../../providers/plugins-nativos/plugins.service.index';
import { Socket } from 'ng-socket-io';
import { SocketIoService } from '../../providers/socket-io/socket-io.service';




@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1:any=VehiclePage;
  tab2:any=CounterPage;

  fechaHora:any;

  server = {
    online:false,
    mensaje:''
  }

  constructor(
              private navCtrl:NavController,
              private alertCtrl:AlertController,
              private contadorService:CounterService,
              private operarioService:OperarioService,
              public io:Socket,
              public SocketIoService:SocketIoService
              ) {

                this.SocketIoService.observar('dispositivoMensajePrivado').subscribe((data) =>{
                  console.log('nuevo app componnet',data);
                });

                
    this.tab1=VehiclePage;
    this.tab2=CounterPage;
    this.obtenerConteo();

    console.log(io);


    console.log('nombre del operario:',this.operarioService.operario);


    setInterval(()=>{
      this.fechaHora= new Date();
    },1000);


    
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

  cerrarSession(){
    //this.operarioService.borrarOperario();
    this.navCtrl.setRoot(LoginPage);
  }






}
