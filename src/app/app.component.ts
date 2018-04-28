import { Component } from '@angular/core';
import { Platform , MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage,TabsPage } from '../pages/index.pages';
import { UserService } from '../providers/user/user.service'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = LoginPage;
  tabsPage:any =TabsPage;

  constructor(
              platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private userService:UserService,
              public menuCtrl:MenuController
              ) {

                  platform.ready().then(() => {
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




}
