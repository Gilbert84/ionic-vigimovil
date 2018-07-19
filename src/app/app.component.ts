import { Component } from '@angular/core';
import { 
          Platform , 
          MenuController , 
          AlertController, 
          LoadingController
        } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';

//plugins servicios
import { PermissionService } from '../providers/plugins-nativos/plugins.service.index';


import { 
          LoginPage,
          TabsPage, 
          ConfigPage,
          AcercaPage,
          DespachoPage
        } from '../pages/index.pages';
import { OperarioService } from '../providers/operario/operario.service';
import { DispositivoService } from '../providers/dispositivo/dispositivo.service';
import { GlobalService } from '../global/global.service'
import { ViajeService } from '../providers/viaje/viaje.service';
import { SocketIoService } from '../providers/socket-io/socket-io.service';






@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  rootPage:any = LoginPage;
  tabsPage:any =TabsPage;
  configPage:any=ConfigPage;
  acercaPage:any=AcercaPage;
  despachoPage:any = DespachoPage;

  android:boolean;



  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private operarioService:OperarioService,
    private dispositivo:DispositivoService,
    private permission:PermissionService,
    public menuCtrl:MenuController,
    private alertCtrl:AlertController,
    private loadingCtrl:LoadingController,
    public globalService:GlobalService,
    public viajeService:ViajeService,
    public socketIoService:SocketIoService
    ) {
                
      platform.ready().then(() => {
        this.iniciarServicios();
        this.splashScreen.hide();

        this.platform.pause.subscribe(() => {
          this.globalService.crearAlerta('Pause','la aplicacion se detendra');
        });

        this.platform.resume.subscribe(() => {
          this.globalService.crearAlerta('Activa','la aplicacion se reactivo');
        });
      });
  }

  loginAdmin(page:any){
    this.alertCtrl.create({
      title: 'Ingrese el usuario',
      inputs:[
        {
          name: 'alias',
          placeholder: 'Nombre de usuario'
        },
        {
          name:'password',
          placeholder:'codigo'
        }
      ],
      buttons:[
        {
          text:'cancelar',
          role:'cancel'
        },
        {
          text:'Ingresar',
          handler: userAdmin=>{
            this.verificarDatos(userAdmin);
          }
        }
      ]
    }).present();
  }

  verificarDatos(userAdmin){//validamos la clave del operario


    let loading=this.loadingCtrl.create({
      content:"Verificando espere por favor..."
    });

    loading.present();

      loading.dismiss();
      if(userAdmin.alias==='admin' && userAdmin.password==='1234'){
       //continuar a la siguiente pantalla segundo slide
       this.configPage=ConfigPage;
       this.openPageSettings(this.configPage);
       this.menuCtrl.close();
  
      }else{
        this.alertCtrl.create({
          title: 'credenciales incorrectas',
          subTitle:"Por favor verifique su datos, o hable con el administrador",
          buttons:["Ok!"]
        }).present();
      }

  }

  openPageSettings(page:any){
    console.log('salir');
    this.rootPage=page;
    this.menuCtrl.close();
  }

  viewMenuSettings(){
    this.menuCtrl.toggle();
  }

  closeMenuSettings(){
    this.menuCtrl.close();
  }

  iniciarServicios() {
    this.dispositivo.cargarStorage().then((registrado)=>{
      if(registrado){
        this.permission.mostrarMensaje('Caragando configuraciones iniciales',2000);
        this.dispositivo.conectarDispositivo();
        this.iniciarObservadores();
      }
      else{
        this.permission.mostrarMensaje('Registrando dispositivo',2000);
        this.dispositivo.registarDispositivo().then((dispositivoCreado)=>{
          if(dispositivoCreado){
            this.dispositivo.conectarDispositivo();
            this.iniciarObservadores();
          }
        });
      }
    });


    this.operarioService.cargarStorage().then((operarioExiste)=>{
      this.viajeService.cargarViaje().then((viajeExiste) => {
        if(!operarioExiste){
          this.rootPage=LoginPage;
          return;
        }
        if(viajeExiste && operarioExiste){
          let estado = this.viajeService.viaje.estado.codigo;
          if(estado === 0 || estado === 1){
            //nuevo
            this.rootPage=this.despachoPage;
          }
          else if (estado ===3){
            //en ruta
            this.rootPage=this.tabsPage;
          }
        }
      });
    }); 
  }


  iniciarObservadores() {

    this.viajeService.observarNuevoViaje().subscribe();

    this.socketIoService.observar('dispositivoMensajeTodos').subscribe((data) =>{
      console.log('dispositivoMensajeTodos',data);
    });

  }

}
