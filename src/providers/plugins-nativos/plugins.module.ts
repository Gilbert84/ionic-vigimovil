import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';

//aqui importamos tosos los servicios creados 
//tanto los servicios propios como los nativos


import {
  AndroidPermissions,
  BatteryStatus,
  Geolocation,
  PermissionService,
  UbicacionService,
  BarcodeScanner,
  QrScannerService,
  AndroidFullScreen,
  StatusBar,
  TextToSpeech,
  TextoAVozService
} from './plugins.service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    AndroidPermissions,
    PermissionService,
    BatteryStatus,
    Geolocation,
    UbicacionService,
    QrScannerService,
    BarcodeScanner,
    AndroidFullScreen,
    StatusBar,
    TextToSpeech,
    TextoAVozService
  ],
  declarations: []
})
export class PluginsModule { }

