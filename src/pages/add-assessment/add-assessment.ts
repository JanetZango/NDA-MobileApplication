import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DisplayListOfAssessmentPage } from '../display-list-of-assessment/display-list-of-assessment';
import { LookUpService } from '../../providers/lookup/lookups.service';
import { EntityProvider } from '../../providers/entity/cso';
import { NgModel, NgForm,Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataProvider } from '../../providers/dataproviders/dataprovider';

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
export class AddAssessmentPage  implements OnInit{
  showQuestions: boolean = false;
  assessmentQuestionArr = new Array();
  assessmentAnswerArr = new Array();
  answerObj = new Array();
  DisplayCso = new Array();


  private authForm : FormGroup;
  //variables
  items;
  cso_name;
  assessment_date;
  assessment_type_id;
  answerQnA;
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


    this.authForm = this.fb.group({  
      'cso_name': ['', Validators.compose([Validators.required])],
      'assessment_date': ['', Validators.compose([Validators.required])],
      'assessment_type_id': ['', Validators.compose([Validators.required])],
      'answerQnA': ['', Validators.compose([Validators.required])]
  });
  }

  ionViewDidLoad() {
    this.getAssessementAnswer();
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
  ngOnInit(){
    this.displayCsoList();
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
      if (typeof (res) != 'undefined') {
        const alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Assessment Saved',
          buttons: ['OK']
        });
        alert.present();
        this.reset();
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
            if(this.answerObj[i].assessment_question_id ===  answers.assessment_question_id){
              this.answerObj.splice(i, 1);
              break;
            }
        }
    }
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
      return;
    }
    this.items = this.csoProvider.listOfCso.filter((x) => {
          return (x.cso_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
    this.authForm.controls['cso_name'].setValue(name.cso_name);
    this.items = []
  }


}
