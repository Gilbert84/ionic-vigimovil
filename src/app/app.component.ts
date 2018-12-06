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
import { DispositivoService } from '../providers/dispositivo/dispositivo.service';
import { FuncionService } from '../providers/funcion/funcion.service';
import { Dispositivo } from '../models/dispositivo.model';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  rootPage:any;
  loginPage:any = LoginPage;
  tabsPage:any =TabsPage;
  configPage:any=ConfigPage;
  acercaPage:any=AcercaPage;
  despachoPage:any = DespachoPage;

  android:boolean;



  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private permission:PermissionService,
    public menuCtrl:MenuController,
    private alertCtrl:AlertController,
    private loadingCtrl:LoadingController,
    private dispositivoService:DispositivoService,
    private funcionService:FuncionService
    ) {
                
      platform.ready().then(() => {

        if(this.funcionService.android){
          this.splashScreen.hide();
          this.platform.pause.subscribe(() => {
            this.funcionService.crearToast('Pause: la aplicacion se detendra',5000);
          });
  
          this.platform.resume.subscribe(() => {
            this.funcionService.crearToast('Activa: la aplicacion se reactivo',5000);
          });
        } 
        this.obtenerDispositivo();
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
    //console.log('salir');
    this.rootPage=page;
    this.menuCtrl.close();
  }

  viewMenuSettings(){
    this.menuCtrl.toggle();
  }

  closeMenuSettings(){
    this.menuCtrl.close();
  }

  obtenerDispositivo() {
    this.dispositivoService.cargarStorage().then((dispositivo:Dispositivo)=>{
      if(dispositivo){
        this.dispositivoService.dispositivo = dispositivo;
        this.permission.mostrarMensaje('Cargando configuraciones iniciales',2000);
        this.rootPage=this.loginPage;
        this.dispositivoService.observarEstadoConexion();
      }
      else{
        this.rootPage=this.configPage;
        this.registrarDispositivo();
      }
    }).catch((error) =>{
      console.log(error);
    });

  }

  registrarDispositivo(){
    this.alertCtrl.create({
      title: 'Registrar Dispositivo',
      subTitle:'Al dar click en registrar acepta los terminos de uso',
      buttons:[
        {
          text:'cancelar',
          role:'cancel',
          handler:()=>{
            console.log('salir de la aplicacion');
          }
        },
        {
          text:'Registrar',
          handler: () =>{
            let loading=this.loadingCtrl.create({
              content:"Verificando espere por favor..."
            });
        
            loading.present();
            this.permission.mostrarMensaje('Registrando dispositivo',2000);
            this.dispositivoService.registarDispositivo().then((resp)=>{
              loading.dismiss();
              this.permission.mostrarMensaje(resp.mensaje,2000);
              this.rootPage=this.loginPage;
            }).catch((error)=>{
              loading.dismiss();
              this.permission.mostrarMensaje(error.mensaje,2000);
            });
          }
        }
      ]
    }).present();
  }

}
