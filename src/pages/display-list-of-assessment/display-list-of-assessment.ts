import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddAssessmentPage } from '../add-assessment/add-assessment';
import { LandingPage } from '../landing/landing';
import { EntityProvider } from '../../providers/entity/cso';
import { LoadingController } from 'ionic-angular';
import { Assessment } from '../../model/assessment-model';

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

  originalListOfAssessment: Assessment[] = [];
  filteredListOfAssessment: Assessment[] = [];
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public csoApi:EntityProvider,
     public loadingCtrl: LoadingController,
   //  public storage: Storage
    ) {
      this._getListOfAssessments();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayListOfAssessmentPage');
  }
  createAssessment(){
    this.navCtrl.push(AddAssessmentPage);
  }
  gotoback(){
    this.navCtrl.push(LandingPage)
  }
  /**
   * 
   * Get List off Assessments
   */
  _getListOfAssessments(){
    const loader = this.loadingCtrl.create({
      content: "Please wait information is still loading...",
      duration: 300000000
    });

    loader.present();
    this.csoApi.getAssessment().subscribe(_response => {
      if(_response){
        this.originalListOfAssessment = _response.assessments;
        this.filteredListOfAssessment = this.originalListOfAssessment;
      }

      loader.dismiss();
    })
  }
  /**
   * 
   * @param element 
   */
  searchForAssessmentByCsoName(element: any) {
    const _needle = element.target.value;
    if (_needle === '') {
      this.filteredListOfAssessment = this.originalListOfAssessment;
      return;
    }
      this.filteredListOfAssessment = this.originalListOfAssessment.filter((assessment) => {
      return (assessment.cso.name_of_cso.toLowerCase().indexOf(_needle.toLowerCase()) > -1);
    })
  }
  /**
   * 
   * @param _assessment 
   */
  viewAssessmentDatials(_assessment: Assessment) {
   // this.storage.set('assessment',_assessment);
  }

}
