import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayListOfCapacityPage } from './display-list-of-capacity';

@NgModule({
  declarations: [
    DisplayListOfCapacityPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayListOfCapacityPage),
  ],
})
export class DisplayListOfCapacityPageModule {}
