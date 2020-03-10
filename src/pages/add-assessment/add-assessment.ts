import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DisplayListOfAssessmentPage } from '../display-list-of-assessment/display-list-of-assessment';
import { LookUpService } from '../../providers/lookup/lookups.service';
import { EntityProvider } from '../../providers/entity/cso';
import { NgModel, NgForm,Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataProvider } from '../../providers/dataproviders/dataprovider';
import { Assessment } from '../../model/assessment-class';

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
  showQuestions: boolean = false;
  assessmentQuestionArr = new Array();
  dataAssessmentQuestionArr = new Array();
  assessmentAnswerArr = new Array();
  answerObj = new Array();
  DisplayCso = new Array();
  assessmentTypeArr = new Array();
  assessmentQuestionAnswerArr = new Array();
  dataAssessmentQuestionAnswerArr = new Array();
  private authForm : FormGroup;
  //variables
  items;
  cso_name;
  assessment_date;
  assessment_type_id;
  answerQnA;

  cso_guid_value:string;

  assessmentObject = new Assessment();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public lookupService: LookUpService,
    public entityProvider: EntityProvider,
    public alertCtrl: AlertController,
    public csoApi:EntityProvider,
    public csoProvider: DataProvider,
    private fb: FormBuilder
  ) {
    this.getAssessmentQuestion();
    this.getAssessmnetType();
    this.getAssessementAnswer();
    this.getQuestionsAnswers();

    this.authForm = this.fb.group({  
      'name_of_cso': ['', Validators.compose([Validators.required])],
      'assessment_date': ['', Validators.compose([Validators.required])],
      'assessment_type_guid': ['', Validators.compose([Validators.required])],
  });
  }

  ionViewDidLoad() {
  }

  reset(){
    this.cso_name =="";
    this.assessment_date =="";
    this.assessment_type_id =="";
    this.answerQnA =="";
  }
  gotoback() {
    this.navCtrl.push(DisplayListOfAssessmentPage)
  }
  /**
   * 
   * Get the List Of Assessment type
   */
  getAssessmnetType(){
    this.lookupService.getAssessementType().subscribe(res =>{
      this.assessmentTypeArr = res;
    });
  }

  getQuestionsAnswers(){
    this.lookupService.getQuestionAnswer().subscribe(res => {
      this.assessmentQuestionAnswerArr = res;
    });

  }

  getAssessementAnswer() {
    this.lookupService.getAssessementAnswer().subscribe(res => {
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
          this.assessmentQuestionArr =  res
        }
      })
  }

  AssessmentQuestions(value) {
    if (value== "91ea8013-3118-45a5-9929-7890eeb80be4") {
      this.showQuestions = true;
    }
    else {
      this.showQuestions = false
    }
  }

  /**
   * 
   * @param assessment 
   */
  addAssessment(assessment:NgForm) {
    // creating an answer obj
    this.assessmentObject.cso_guid = this.cso_guid_value;
    this.assessmentObject.assessment_date = assessment.value.assessment_date
    this.assessmentObject.assessment_type_guid = assessment.value.assessment_type_guid
    this.assessmentObject.cso_assessment = this.answerObj
    this.entityProvider.saveAssessment(JSON.stringify(this.assessmentObject)).subscribe(res => {
      if (typeof (res) != 'undefined') {
        const alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Assessment Saved',
          buttons: ['OK']
        });
        alert.present();
        assessment.resetForm();
        this.assessmentObject = new Assessment();
        //this.navCtrl.push(LandingPage);
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
    if(this.answerObj.length > 0){
      // checking if there is answer from the same Question if is there is must be removed and replaced with new selected answer
        for(var i = 0; i < this.answerObj.length;i++ ){
            if(this.answerObj[i].question_guid ===  answers.question_guid){
              this.answerObj.splice(i, 1);
              break;
            }
        }
    }
    // deleting element which are not needed 
    delete answers.weight;
    delete answers.answer;
    this.answerObj.push(answers);
  }
  // ** search by name
  displayCsoList(){
    this.csoApi.getCso().subscribe(res => {
      if(res){
        this.DisplayCso = res.results
        this.storeNames();
        for(var x =0; x < this.DisplayCso.length;x ++){
          this.storeOrgNames(this.DisplayCso[x].cso_name)
           
        }
      }
    })
  }
  CsoName = new Array();
  storeOrgNames(cso_name) {
    this.CsoName.push(cso_name);
  }

  getCsoName(){
    return this.CsoName
    
  }

  /**
   * 
   * @param ev 
   * 
   */
  getItems(ev: any){
    const val = ev.target.value;
    if(val === ''){
      this.items =[];
      this.cso_guid_value ="";
      return;
    }
    this.items = this.csoProvider.listOfCso.filter((x) => {
          return (x.name_of_cso.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
  }

  initializeItems() {
    this.items = []
    this.items = this.namesArr
  }
  namesArr = new Array()
  storeNames() {
    this.namesArr = this.CsoName;
  }


  openMarkerInfo(name, assessment){
    this.authForm.controls['name_of_cso'].setValue(name.name_of_cso);
    this.cso_guid_value = name.guid;
    this.items = []
  }
}
