import { Component } from '@angular/core';
import { Platform , MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//plugins
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { LoginPage,TabsPage } from '../pages/index.pages';
import { UserService } from '../providers/user/user.service';
import { SocketIoService } from '../providers/socket-io/socket-io';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = LoginPage;
  tabsPage:any =TabsPage;

  dispositivo = {
    UUID: '',
    MAC:'',
    IMEI:'',
    IMSI:'',
    ICCID:'',
    NAME: 'K900'
  };

  constructor(
              platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private userService:UserService,
              private io:SocketIoService,
              public menuCtrl:MenuController,
              private uid: Uid,
              private androidPermissions: AndroidPermissions
              ) {

                  platform.ready().then(() => {

                    this.io.sendMessageDev(this.dispositivo);
                    this.io
                    .getMessage()
                    .subscribe(msg => {
                      console.log('servidor:', msg);
                    });


                  // Okay, so the platform is ready and our plugins are available.
                  // Here you can do any higher level native things you might need.
                  // this.userService.loadStorage()
                  //                 .then(()=>{
                  //                   if(this.userService.key){
                  //                     this.rootPage=TabsPage;
                  //                     console.log('tabspage inicio');
                  //                   }else{
                  //                     this.rootPage=LoginPage;
                  //                   }

                  //                   statusBar.styleDefault();
                  //                   splashScreen.hide();

                  //                 });

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

  async getImei() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );
   
    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );
   
      if (!result.hasPermission) {
        throw new Error('Permiso requerido');
      }
   
      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }
   
     return this.uid.IMEI
   }




}
