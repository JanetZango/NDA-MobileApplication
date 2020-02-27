import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  assessmentQuestionArr = new Array();
  assessmentAnswerArr = new Array();
  answerObj = new Array();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public lookupService: LookUpService,
    public entityProvider: EntityProvider,
    public alertCtrl: AlertController,
  ) {
    this.getAssessmentQuestion();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAssessmentPage');
    this.getAssessementAnswer();
  }
  gotoback() {
    this.navCtrl.push(DisplayListOfAssessmentPage)
  }

  getAssessementAnswer() {

    this.lookupService.getAssessementAnswer().subscribe(res => {
     // console.log(res);
      this.assessmentAnswerArr = res;
    });
  }
  /**
   * Get Assessment Question
   */
  getAssessmentQuestion(){
    this.lookupService.getAssessmentQuestion()
      .subscribe(res => {
        if(res){
          //console.log("Assessments Question"+res);
          this.assessmentQuestionArr =  res
        }
      })
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

  /**
   * 
   * @param assessment 
   */
  addAssessment() {

    this.entityProvider.saveAssessment(this.answerObj).subscribe(res => {
      debugger
      if (typeof (res) != 'undefined') {
        const alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Assessment Saved',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push(DisplayListOfAssessmentPage);
      }
      else {
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Assessment was not saved',
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

  /**
   * 
   * @param answers 
   */
  selectRad(answers){
    debugger
    if(this.answerObj.length > 0){
      // checking if there is answer from the same Question if is there is must be removed and replaced with new selected answer
        for(var i = 0; i < this.answerObj.length;i++ ){
            if(this.answerObj[i].assessment_question_id ===  answers.assessment_question_id){
              this.answerObj.splice(i, 1);
              break;
            }
        }
    }
    this.answerObj.push(answers);
  }
}
