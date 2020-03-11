import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DisplayListOfAssessmentPage } from '../display-list-of-assessment/display-list-of-assessment';
import { EntityProvider } from '../../providers/entity/cso';
import { Storage } from '@ionic/storage';
import { Assessment } from '../../model/assessment-model';

/**
 * Generated class for the ViewAssessmentDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-assessment-details',
  templateUrl: 'view-assessment-details.html',
})
export class ViewAssessmentDetailsPage {

  assessment:Assessment;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public api: EntityProvider,
      public storage: Storage
      ) {
  }

  ngOnInit() {
    debugger
    this.storage.get('cso_assessment').then((assessment) => {
      this.assessment = assessment;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewAssessmentDetailsPage');
  }

  goToAssessmentListView(){
    this.navCtrl.push(DisplayListOfAssessmentPage);
  }

}
