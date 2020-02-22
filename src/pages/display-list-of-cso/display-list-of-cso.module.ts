import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayListOfCsoPage } from './display-list-of-cso';

@NgModule({
  declarations: [
    DisplayListOfCsoPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayListOfCsoPage),
  ],
})
export class DisplayListOfCsoPageModule {}
