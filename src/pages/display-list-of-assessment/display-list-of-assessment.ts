import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddAssessmentPage } from '../add-assessment/add-assessment';
import { LandingPage } from '../landing/landing';
import { EntityProvider } from '../../providers/entity/cso';
import { LoadingController } from 'ionic-angular';

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
  DisplayAssessment = new Array();
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public csoApi:EntityProvider,
     public loadingCtrl: LoadingController ) {

      this.getAssessments();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayListOfAssessmentPage');
  }
  addBuilding(){
    this.navCtrl.push(AddAssessmentPage);
  }
  gotoback(){
    this.navCtrl.push(LandingPage)
  }

  /**
   * 
   * Get List off Assessments
   */
  getAssessments(){
    const loader = this.loadingCtrl.create({
      content: "Please wait information is still loading..."
      //duration: 300000000
    });
    loader.present();
    this.csoApi.getAssessment().subscribe(res => {
      if(res){
        this.DisplayAssessment = res.assessments
        console.log(this.DisplayAssessment[0].assessment_type.calculate_assessment_level)
  
      }

      loader.dismiss();
    })
  }

}
