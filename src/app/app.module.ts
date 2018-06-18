import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core'; //  ApplicationRef
import { CommonModule } from '@angular/common';
import { HttpClientModule } from  '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocketIoModule } from 'ng-socket-io';

// configuraciones socket.io
import { config } from '../config/socket-io.config'; 


//ruta de plugins modules
import { PluginsModule } from '../providers/plugins-nativos/plugins.module';
import { AgmCoreModule } from '@agm/core';//mapas
import { NgxGaugeModule } from 'ngx-gauge';//gauge

//servicios
import { OperarioService } from '../providers/operario/operario.service';
import { DispositivoService } from '../providers/dispositivo/dispositivo.service';
import { CounterService } from '../providers/counter/counter.service';
import { SocketIoService } from '../providers/socket-io/socket-io.service';
import { WebsocketService } from '../providers/websocket/websocket.service';

//servicio global 
import { GlobalService } from '../global/global.service';


import { MyApp } from './app.component';
//paginas globales
import { 
          LoginPage,
          TabsPage,
          CounterPage,
          VehiclePage, 
          ConfigPage,
          AcercaPage
        } from '../pages/index.pages';
//paginas locales o sub rutas
import { CounterEventPage , QrScannerPage } from '../pages/counter/indexCounter.pages';
import { VehicleEventPage } from '../pages/vehicle/indexVehicle.pages';





@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    CounterPage,
    CounterEventPage,
    VehiclePage,
    VehicleEventPage,
    QrScannerPage,
    ConfigPage,
    AcercaPage
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgxGaugeModule,
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
    VehicleEventPage,
    QrScannerPage,
    ConfigPage,
    AcercaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OperarioService,
    CounterService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SocketIoService,
    WebsocketService,
    DispositivoService,
    GlobalService
  ]
})
export class AppModule {}
