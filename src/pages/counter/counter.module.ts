import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CounterPage } from './counter';
import { CounterService } from '../../providers/counter/counter.service';

@NgModule({
  declarations: [
    CounterPage,
  ],
  imports: [
    IonicPageModule.forChild(CounterPage),
  ],
})
export class CounterPageModule {

	constructor() {
		console.log('obteniendo info de websockets');

	}


}
