import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCapacityPage } from './add-capacity';

@NgModule({
  declarations: [
    AddCapacityPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCapacityPage),
  ],
})
export class AddCapacityPageModule {}
