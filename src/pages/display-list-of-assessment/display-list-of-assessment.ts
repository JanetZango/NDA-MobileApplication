import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddAssessmentPage } from '../add-assessment/add-assessment';


/**
 * Generated class for the DisplayListOfAssessmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-display-list-of-assessment',
  templateUrl: 'display-list-of-assessment.html',
})
export class DisplayListOfAssessmentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayListOfAssessmentPage');
  }
  addBuilding(){
    this.navCtrl.push(AddAssessmentPage);
  }

}
