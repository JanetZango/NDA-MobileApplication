import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {LandingPage} from "../landing/landing";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";
import {Cso} from "../../model/cso.model";
import {ViewCsoDetailsPage} from "../view-cso-details/view-cso-details";
import {LookUpService} from "../../providers/lookup/lookups.service";
import {map} from "rxjs/operators";
import {AssessmentPayloadModel} from "../../model/payload/assessment-payload.model";
import {AssessmentService} from "../../service/assessment.service";
import {DisplayListOfAssessmentPage} from "../display-list-of-assessment/display-list-of-assessment";
import { ToastController } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


export interface AssessmentType {
    title: string;
    guid: string;
}

@IonicPage()
@Component({
  selector: 'page-add-assessment',
  templateUrl: 'add-assessment.html',
})
export class AddAssessmentPage implements OnInit {
  private isOpen: boolean = false
  public db: SQLiteObject;
  sql;
  cso: Cso;
  listOfQuestions: any[] = [];
  listOfAssessmentQuestions = [];
  listOfAssessmentAnswers = [];
  listOfAssessmentAssessmentType = [];
  listOfAssessmentAssessmentTypeSections = [];
  assessmentTypeName = "CSO Mobilisation Needs Assessment Form";
  assessmentType: AssessmentType;
  assessmentTypeSections = [];
  filteredAssessmentTypeSections = [];
  listOfDynamicQuestionsFound = [];
  assessmentDate = "";


  autoManufacturers = '';
  assessment_date;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public lookupService: LookUpService,
    public assessmentService: AssessmentService,
    public toastCtrl: ToastController
  ) {
    this.assessment_date = new Date().toISOString().slice(0, 10);
  }
  
  countQuestions(question_guid: string){
    if(this.listOfDynamicQuestionsFound.indexOf(question_guid) === -1){
      this.listOfDynamicQuestionsFound.push(question_guid)
    }
  }
  onSubmit(){
    let finalList = [];
    this.SaveCSOoFFline();
    for(let key in this.listOfQuestions){
      let strTmp = this.listOfQuestions[key];
      let arrTmp = strTmp.split(',');
      finalList.push({
        'assessment_type_section_guid': arrTmp[0],
        'question_guid': arrTmp[1],
        'answer_guid': arrTmp[2]
      });
    }

    if(finalList.length !== this.listOfDynamicQuestionsFound.length){
      const alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'Please complete all the questions.',
        buttons: ['OK']
      });
      alert.present();
    } else {
    
      let payload = new AssessmentPayloadModel();
      payload.cso_id = this.cso.guid;
      payload.assessment_questions = finalList;
      payload.assessment_type_id = this.assessmentType.guid;

      // const _loader = this.loadingCtrl.create({
      //   content: "Please wait whilst we create assessment...",
      //   duration: 300000000
      // });

      // _loader.present();

      this.assessmentService.createAssessment(payload).subscribe((_responseData: any) => {
        // _loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Assesment was added successfully',
          duration: 3000
        });
        toast.present();
        return this.navCtrl.push(DisplayListOfAssessmentPage);
      }, _error => {
        // _loader.dismiss();
        if (_error.status === 400) {
          const alert = this.alertCtrl.create({
            title: 'Oops',
            subTitle: 'You have entered invalid details, please check your form inputs.',
            buttons: ['OK']
          });
          alert.present();
        } else {
          // const alert = this.alertCtrl.create({
          //   title: 'Oops',
          //   subTitle: 'Something went wrong, please contact administrator.',
          //   buttons: ['OK']
          // });
          // alert.present();
        }
      });
    }
  }
  csoOff = 121
  calc_assessment_level=1
  
  SaveCSOoFFline(){
    let finalList = [];
    for(let key in this.listOfQuestions){
      let strTmp = this.listOfQuestions[key];
      let arrTmp = strTmp.split(',');
      finalList.push({
        'assessment_type_section_guid': arrTmp[0],
        'question_guid': arrTmp[1],
        'answer_guid': arrTmp[2]
      });
    }

    if (!this.isOpen) {
      this.sql = new SQLite();
      this.sql.create({ name: "test11.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
         this.isOpen = true;
         return new Promise((resolve, reject) => {
          let sql = "INSERT INTO Assessment (cso_id, assessment_type_id ,calc_assessment_level,assessment_date) VALUES (?,?,?,?)";
          this.db.executeSql(sql, [ this.csoOff, this.assessmentType.guid,this.calc_assessment_level,this.assessment_date]).then((data) => {
            console.log(data);
            console.log("INSERTED: " + JSON.stringify(data) + sql);
            const toast = this.toastCtrl.create({
              message: 'Assesment was added successfully',
              duration: 3000
            });
            toast.present();
          }, (reject) => {
          })
         
        })
            }, (reject) => {
            // })
        })
  
  }
}

  ngOnInit() {
    this.storage.get('current_cso').then((entity) => {
      this.cso = entity;
    });
    this._getAssessmentQuestions();
    this._getAssessmentAnswers();
    this._getAssessmentTypeSections();
  }

  _getAssessmentQuestions() {
    this.lookupService.getAssessmentQuestion().subscribe(_results => {
      this.listOfAssessmentQuestions = _results;
    })
  }

  _getAssessmentAnswers() {
    this.lookupService.getAssessementAnswer().subscribe(_results => {
      this.listOfAssessmentAnswers = _results;
    })
  }

  _getAssessmentType(assessmentTypeName: string) {
    return this.lookupService.getAssessementType().pipe(
      map(_results => {
        this.listOfAssessmentAssessmentType = _results;
        for (let x = 0; x <= this.listOfAssessmentAssessmentType.length; x++) {
          if (this.listOfAssessmentAssessmentType[x].title === assessmentTypeName) {
            this.assessmentType = this.listOfAssessmentAssessmentType[x];
            break;
          }
        }
      })
    );
  }

  _getAssessmentTypeSections() {
    this._getAssessmentType(this.assessmentTypeName).subscribe(_resultsAssessmentTypes => {
      this.lookupService.getAssessementTypeSection().subscribe(_resultsAssessmentTypeSections => {
        this.listOfAssessmentAssessmentTypeSections = _resultsAssessmentTypeSections;
        this._getFilteredAssessmentTypeSections();
      })
    });
  }

  _getFilteredAssessmentTypeSections(){
    this.filteredAssessmentTypeSections =  this.listOfAssessmentAssessmentTypeSections.filter(x => x.assessment_type_guid === this.assessmentType.guid);
  }

  getQuestionsByAssessmentTypeSection(assessment_type_section_guid: string){
      return this.listOfAssessmentQuestions.filter(x => x.assessment_type_section_guid === assessment_type_section_guid);
  }

  getAnswersByQuestionGuid(assessment_question_guid: string){
      return this.listOfAssessmentAnswers.filter(x => x.assessment_question_guid === assessment_question_guid);
  }

  goBackToCsoViewDetails() {
    this.navCtrl.pop()
  }

  goBackToHomePage() {
    this.navCtrl.push(LandingPage)
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: 'Logout',
      message: 'You are about to logout, do you want to proceed?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.storage.remove('authUser').then(removed => {
              this.navCtrl.push(LoginPage);
            });
          }
        }
      ]
    });
    alert.present();
  }

}
