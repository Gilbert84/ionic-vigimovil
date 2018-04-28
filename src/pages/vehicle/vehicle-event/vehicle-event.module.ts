import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleEventPage } from './vehicle-event';

@NgModule({
  declarations: [
    VehicleEventPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleEventPage),
  ],
})
export class VehicleEventPageModule {}
