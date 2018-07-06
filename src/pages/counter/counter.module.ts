import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CounterPage } from './counter';

@NgModule({
  declarations: [
    CounterPage,
  ],
  imports: [
    IonicPageModule.forChild(CounterPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CounterPageModule {

	constructor() {}


}
