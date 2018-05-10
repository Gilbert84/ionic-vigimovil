import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocketIoModule } from 'ng-socket-io';

// configuraciones socket.io
import { config } from '../config/socket-io.config'; 


//puguins native
//storage cmd :ionic cordova plugin add cordova-sqlite-storage
import { IonicStorageModule } from '@ionic/storage';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';

//servicios
import { UserService } from '../providers/user/user.service';
import { CounterService } from '../providers/counter/counter.service';

import { MyApp } from './app.component';
//paginas globales
import { LoginPage,TabsPage,CounterPage,VehiclePage } from '../pages/index.pages';
//paginas locales o sub rutas
import { CounterEventPage } from '../pages/counter/indexCounter.pages';
import { VehicleEventPage } from '../pages/vehicle/indexVehicle.pages';
import { SocketIoService } from '../providers/socket-io/socket-io';
import { WebsocketService } from '../providers/websocket/websocket';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    CounterPage,
    CounterEventPage,
    VehiclePage,
    VehicleEventPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
    LoginPage,
    TabsPage,
    CounterPage,
    CounterEventPage,
    VehiclePage,
    VehicleEventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    CounterService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SocketIoService,
    WebsocketService,
    Uid,
    AndroidPermissions
  ]
})
export class AppModule {}
