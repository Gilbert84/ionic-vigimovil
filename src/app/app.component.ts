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
          AcercaPage
        } from '../pages/index.pages';
import { OperarioService } from '../providers/operario/operario.service';
import { DispositivoService } from '../providers/dispositivo/dispositivo.service';
import { GlobalService } from '../global/global.service'






@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  rootPage:any = LoginPage;
  tabsPage:any =TabsPage;
  configPage:any=ConfigPage;
  acercaPage:any=AcercaPage;

  android:boolean;



  constructor(
              platform: Platform,
              splashScreen: SplashScreen,
              private operarioService:OperarioService,
              private dispositivo:DispositivoService,
              private permission:PermissionService,
              public menuCtrl:MenuController,
              private alertCtrl:AlertController,
              private loadingCtrl:LoadingController,
              public globalService:GlobalService
              ) {



                
                  platform.ready().then(() => {

                    dispositivo.cargarStorage().then((registrado)=>{

                    splashScreen.hide();

                      if(registrado){
                        this.permission.mostrarMensaje('dispositivo ya esta registrado',3000);
                        this.dispositivo.conectarDispositivo();
                      }
                      else{
                        this.permission.mostrarMensaje('registrando dispositivo',3000);
                        this.dispositivo.registarDispositivo();
                      }
                    });


                    this.operarioService.cargarStorage().then((existe)=>{
                      if(existe){
                        this.rootPage=this.tabsPage;
                      }else{
                        this.rootPage=LoginPage
                        //this.rootPage=this.tabsPage;
                      }
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


  
}
