import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCsoPage } from './add-cso';

@NgModule({
  declarations: [
    AddCsoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCsoPage),
  ],
})
export class AddCsoPageModule {}
