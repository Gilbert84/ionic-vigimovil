import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehiclePage } from './vehicle';
import { AgmDirectionModule } from 'agm-direction';   // agm-direction //http://robby570.tw/Agm-Direction-Docs/


@NgModule({
  declarations: [
    VehiclePage,
  ],
  imports: [
    IonicPageModule.forChild(VehiclePage),
    AgmDirectionModule
  ],
})
export class VehiclePageModule {}
