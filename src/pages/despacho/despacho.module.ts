import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DespachoPage } from './despacho';

@NgModule({
  declarations: [
    DespachoPage,
  ],
  imports: [
    IonicPageModule.forChild(DespachoPage),
  ],schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DespachoPageModule {}
