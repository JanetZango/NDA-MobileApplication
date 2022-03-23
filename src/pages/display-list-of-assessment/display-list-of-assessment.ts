import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {AddAssessmentPage} from '../add-assessment/add-assessment';
import {LandingPage} from '../landing/landing';
import {LoadingController} from 'ionic-angular';
import {Assessment} from '../../model/assessment.model';
import {ViewAssessmentPage} from "../view-assessment/view-assessment";
import {LoginPage} from "../login/login";
import {AssessmentService} from "../../service/assessment.service";
import { SyncService } from '../../service/Sync.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
export interface AssessmentListResponse {
  assessments: any;
}


@IonicPage()
@Component({
  selector: 'page-display-list-of-assessment',
  templateUrl: 'display-list-of-assessment.html',
})
export class DisplayListOfAssessmentPage {
  private isOpen: boolean = false
  public db: SQLiteObject;
  sql;
  originalListOfAssessment: Assessment[] = [];
  filteredListOfAssessment: Assessment[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public assessmentService: AssessmentService,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public sqlite :SqliteProvider,
    public sync:SyncService
  ) {
    this._getListOfAssessments();
  }

  createAssessment() {
    this.navCtrl.push(AddAssessmentPage);
  }

  gotoback() {
    this.navCtrl.push(LandingPage)
  }

  _getListOfAssessments() {
    // const _loader = this.loadingCtrl.create({
    //   content: "Please wait information is still loading...",
    //   duration: 300000000
    // });

    // _loader.present();

    this.assessmentService.listOOfAssessment().subscribe((_response: any) => {
      this.filteredListOfAssessment = _response;

      console.log(this.filteredListOfAssessment)
      this.originalListOfAssessment = _response;
      this.filteredListOfAssessment.reverse();
      this.filteredListOfAssessment = _response
      // _loader.dismiss();
    }, _error => {
      // _loader.dismiss();
      // const alert = this.alertCtrl.create({
      //   title: 'Oops',
      //   subTitle: 'Something went wrong, please contact administrator.',
      //   buttons: ['OK']
      // });
      // alert.present();
    })
    this.SyncMethod();
  }
  SyncMethod(){
    this.sqlite.getAssessment().then((_responseCso:any)=>{
      // _loader.dismiss();
      console.log(_responseCso)
      this.filteredListOfAssessment = _responseCso

      console.log(_responseCso)

      this.sync.SyncAssessment(_responseCso).subscribe(data =>{
        console.log(data)
        this.DeleteLocalCSO()
      })
    })
  }
  DeleteLocalCSO(){
    if (!this.isOpen) {
      this.sql = new SQLite();
      this.sql.create({ name: "test10.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        this.db = db;
        db.executeSql('DELETE FROM Assessment', [])
        console.log("Tables Deleted")

      }).catch((error) => {
        console.log(error);
      }); 

    }
}

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

  viewAssessmentDetails(_assessment: Assessment) {
    this.storage.set('current_assessment', _assessment);
    this.navCtrl.push(ViewAssessmentPage)
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
