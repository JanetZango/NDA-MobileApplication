import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayListOfAssessmentPage } from './display-list-of-assessment';

@NgModule({
  declarations: [
    DisplayListOfAssessmentPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayListOfAssessmentPage),
  ],
})
export class DisplayListOfAssessmentPageModule {}
