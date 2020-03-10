import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DisplayListOfCsoPage } from '../display-list-of-cso/display-list-of-cso';
import { DisplayListOfAssessmentPage } from '../display-list-of-assessment/display-list-of-assessment';
import { DisplayListOfCapacityPage } from '../display-list-of-capacity/display-list-of-capacity';
import { AsynPage } from '../asyn/asyn';
import { EntityProvider } from '../../providers/entity/cso';
import { DataProvider } from '../../providers/dataproviders/dataprovider';

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public entityProvider: EntityProvider,
    public csoProvider: DataProvider
    ) {}

  ionViewDidLoad() {
  }
  DisplayListOfCSO(){
      this.navCtrl.push(DisplayListOfCsoPage)
  }
  DisplayListOfAssessment(){
      this.navCtrl.push(DisplayListOfAssessmentPage)
  }
  DisplayListOfCapacity(){
      this.navCtrl.push(DisplayListOfCapacityPage)

  }
   gotoAsync(){
       this.navCtrl.push(AsynPage)
  }

}
