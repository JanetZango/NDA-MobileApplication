import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayCsoMemberListPage } from './display-cso-member-list';

@NgModule({
  declarations: [
    DisplayCsoMemberListPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayCsoMemberListPage),
  ],
})
export class DisplayCsoMemberListPageModule {}
