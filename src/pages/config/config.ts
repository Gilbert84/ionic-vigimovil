import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../index.pages'
import { ConfigService } from '../../providers/config/config.service';
import { GlobalService } from '../../global/global.service';
import { Configuracion } from '../../interfaces/configuracion.interface';
 

@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  configuracion:Configuracion ={
    autoInicio:false,
    areaMetropool:false,
    serverIp:'http://localhost:3000',
    contadorIp:'ws://192.168.1.10:81',
    apykey:''
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private configService:ConfigService,
    private globalService:GlobalService
    ) {
  }

  ionViewDidLoad() {
    this.configService.cargarConfiguracion().then( (existe) =>{
      if(existe){
        this.configuracion = this.configService.configuracion;
      }
    });
  }

  guardar(){
 
    this.configService.consultarUrl(this.configuracion.serverIp).subscribe((resp) =>{
      this.globalService.crearAlerta('ok','url server: '+ this.configuracion.serverIp + ' server dice', resp.mensaje);
    },
    (error) =>{
      this.globalService.crearAlerta('ups','url server: ' + this.configuracion.serverIp + ' mal escrita o no existe',error.message);
    });

    this.configService.consultarUrl(this.configuracion.contadorIp).subscribe((resp) =>{
      this.globalService.crearAlerta('ok','url contador server dice', resp.mensaje);
    },
    (error) =>{
      this.globalService.crearAlerta('ups','url contador mal escrita o no existe',error.message);
    });

    this.configService.guardarConfiguracion(this.configuracion).then((existe)=>{
      if(existe){
        this.configuracion = this.configService.configuracion;
      }
    });
    
  }


  salir(){
    this.navCtrl.setRoot(LoginPage);
  }
}
