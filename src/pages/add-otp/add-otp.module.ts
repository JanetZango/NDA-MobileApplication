import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddOtpPage } from './add-otp';

@NgModule({
  declarations: [
    AddOtpPage,
  ],
  imports: [
    IonicPageModule.forChild(AddOtpPage),
  ],
})
export class AddOtpPageModule {}
