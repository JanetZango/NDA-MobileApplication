import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DisplayListOfAssessmentPage } from '../display-list-of-assessment/display-list-of-assessment';

/**
 * Generated class for the AddAssessmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-assessment',
  templateUrl: 'add-assessment.html',
})
export class AddAssessmentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAssessmentPage');
  }
  gotoback(){
    this.navCtrl.push(DisplayListOfAssessmentPage)
  }
}
