import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule , ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from  '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocketIoModule } from 'ng-socket-io';

// configuraciones socket.io
import { config } from '../config/socket-io.config'; 


//ruta de plugins modules
import { PluginsModule } from '../providers/plugins/plugins.module';
import { AgmCoreModule } from '@agm/core';//mapas

//servicios
import { OperarioService } from '../providers/operario/operario.service';
import { DispositivoService } from '../providers/dispositivo/dispositivo.service';
import { CounterService } from '../providers/counter/counter.service';
import { SocketIoService } from '../providers/socket-io/socket-io.service';
import { WebsocketService } from '../providers/websocket/websocket.service';


import { MyApp } from './app.component';
//paginas globales
import { LoginPage,TabsPage,CounterPage,VehiclePage } from '../pages/index.pages';
//paginas locales o sub rutas
import { CounterEventPage } from '../pages/counter/indexCounter.pages';
import { VehicleEventPage } from '../pages/vehicle/indexVehicle.pages';





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
    CommonModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB_m-EEppdQobezGoeB3wCFYWqSt8FcDqY'
    }),
    PluginsModule,
    HttpClientModule
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
    OperarioService,
    CounterService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SocketIoService,
    WebsocketService,
    DispositivoService
  ]
})
export class AppModule {}
