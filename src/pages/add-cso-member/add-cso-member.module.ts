import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCsoMemberPage } from './add-cso-member';

@NgModule({
  declarations: [
    AddCsoMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCsoMemberPage),
  ],
})
export class AddCsoMemberPageModule {}
