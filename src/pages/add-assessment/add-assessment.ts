import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { DisplayListOfAssessmentPage } from '../display-list-of-assessment/display-list-of-assessment';
import { LookUpService } from '../../providers/lookup/lookups.service';
import { NgModel, NgForm } from '@angular/forms';
import { EntityProvider } from '../../providers/entity/cso';

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
  assessment_type_id;
  showQuestions: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public lookupService: LookUpService,
    public entityProvider: EntityProvider,
    public alertCtrl: AlertController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAssessmentPage');
    this.getAssessementAnswer();
  }
  gotoback(){
    this.navCtrl.push(DisplayListOfAssessmentPage)
  }

  getAssessementAnswer(){
    
    this.lookupService.getAssessementAnswer().subscribe(res => {
      console.log(res);
    });
  }

  AssessmentQuestions() {
    if (this.assessment_type_id == "1") {
      this.showQuestions = true;
      console.log("show")
    }
    else {
      this.showQuestions = false
    }
  }

  



  addCapacity(assessment: NgForm){
     this.entityProvider.saveAssessment(assessment.value).subscribe(res => {
     if (typeof (res) != 'undefined') {
       const alert = this.alertCtrl.create({
         title: 'Alert',
         subTitle: 'Capacity Building Saved',
         buttons: ['OK']
       });
       alert.present();
       this.navCtrl.push(DisplayListOfAssessmentPage);
     }
     else {
       const alert = this.alertCtrl.create({
         title: 'Oops!',
         subTitle: 'Please enter your email address!',
         buttons: ['OK']
       });
       alert.present();
     }
   }, (err) => {
     const alert = this.alertCtrl.create({
       title: 'Error!',
       subTitle: 'Something went wrong!',
       buttons: ['OK']
     });
     alert.present();

   });
 }

}
