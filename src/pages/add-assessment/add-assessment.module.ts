import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAssessmentPage } from './add-assessment';

@NgModule({
  declarations: [
    AddAssessmentPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAssessmentPage),
  ],
})
export class AddAssessmentPageModule {}
