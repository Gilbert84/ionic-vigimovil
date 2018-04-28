import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CounterEventPage } from './counter-event';

@NgModule({
  declarations: [
    CounterEventPage,
  ],
  imports: [
    IonicPageModule.forChild(CounterEventPage),
  ],
})
export class CounterEventPageModule {}
