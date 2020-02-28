import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DisplayListOfAssessmentPage } from '../display-list-of-assessment/display-list-of-assessment';
import { LookUpService } from '../../providers/lookup/lookups.service';
import { NgModel, NgForm } from '@angular/forms';
import { EntityProvider } from '../../providers/entity/cso';
import { ApiProvider } from '../../providers/api/api';
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
  assessment_type_id;
  showQuestions: boolean = false;
  assessmentQuestionArr = new Array();
  assessmentAnswerArr = new Array();
  answerObj = new Array();
  DisplayCso = new Array();



  //variables
  items;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public lookupService: LookUpService,
    public entityProvider: EntityProvider,
    public alertCtrl: AlertController,
    public csoApi:EntityProvider,
    public csoProvider: DataProvider,
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
      if (typeof (res) != 'undefined') {
        const alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Assessment Saved',
          buttons: ['OK']
        });
        alert.present();
        // this.navCtrl.push(DisplayListOfAssessmentPage);
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
        console.log(res.results);
        this.DisplayCso = res.results
        this.storeNames();
        console.log(this.DisplayCso[0].cso_name)
        for(var x =0; x < this.DisplayCso.length;x ++){
          this.storeOrgNames(this.DisplayCso[x].cso_name)
           
        }
      }
    })
  }
  CsoName = new Array();
  storeOrgNames(cso_name) {
    this.CsoName.push(cso_name);
    console.log(this.CsoName)
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
    this.items = this.csoProvider.listOfCso.filter((x) => {
          return (x.cso_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
  }

  initializeItems() {
    this.items = []
    this.items = this.namesArr
    console.log(this.items)
  }
  namesArr = new Array()
  storeNames() {
    this.namesArr = this.CsoName;
    console.log(this.namesArr)
  }


  openMarkerInfo(name, assessment){
    assessment.controls['cso_name'].setValue(name.cso_name);
    this.items = []
  }


}
