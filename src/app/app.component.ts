import { Component } from '@angular/core';
import { Platform , MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//plugins servicios
import { PermissionService } from '../providers/plugins/plugins.service.index';


import { LoginPage,TabsPage } from '../pages/index.pages';
import { OperarioService } from '../providers/operario/operario.service';
import { DispositivoService } from '../providers/dispositivo/dispositivo.service';






@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = LoginPage;
  tabsPage:any =TabsPage;

  android:boolean;



  constructor(
              private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private operarioService:OperarioService,
              private dispositivo:DispositivoService,
              private permission:PermissionService,
              public menuCtrl:MenuController,
              ) {

                
                  platform.ready().then(() => {

                    dispositivo.cargarStorage().then((registrado)=>{
                      if(registrado){
                        console.log('dispositivo registrado');
                        if(permission.android){
                          this.dispositivo.uid();
                        }

                      }else{
                        console.log('registrando dispositivo');
                        this.dispositivo.registarDispositivo();
                      }
                    });


                    this.operarioService.cargarStorage().then((existe)=>{

                      if(existe){
                        this.rootPage=this.tabsPage;
                      }else{
                        this.rootPage=LoginPage
                    }
                  }); 

                  statusBar.styleDefault();
                  splashScreen.hide();

                });
  }


  openPageSettings(page:any){
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
