import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AsynPage } from './asyn';

@NgModule({
  declarations: [
    AsynPage,
  ],
  imports: [
    IonicPageModule.forChild(AsynPage),
  ],
})
export class AsynPageModule {}
