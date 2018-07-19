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

import { StoreModule } from '@ngrx/store'
//ruta de plugins modules
import { PluginsModule } from '../providers/plugins-nativos/plugins.module';
import { AgmCoreModule } from '@agm/core';//mapas
import { AgmDirectionModule } from 'agm-direction';   // agm-direction //http://robby570.tw/Agm-Direction-Docs/
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
          AcercaPage,
          DespachoPage
        } from '../pages/index.pages';
//paginas locales o sub rutas
import { CounterEventPage , QrScannerPage } from '../pages/counter/indexCounter.pages';
import { VehicleEventPage } from '../pages/vehicle/indexVehicle.pages';
import { ViajeService } from '../providers/viaje/viaje.service';
import { SubirArchivoService } from '../providers/subir-archivo/subir-archivo.service';


 //import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { appReducers } from '../store/app.reducer';



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
    AcercaPage,
    DespachoPage
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
    AgmDirectionModule,
    PluginsModule,
    HttpClientModule,
    //StoreModule.forRoot(appReducers)
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25, // Retains last 25 states
    //   logOnly: true, // Restrict extension to log-only mode
    // }),
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
    AcercaPage,
    DespachoPage
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
    GlobalService,
    ViajeService,
    SubirArchivoService
  ]
})
export class AppModule {}
