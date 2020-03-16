import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {AddAssessmentPage} from '../add-assessment/add-assessment';
import {LandingPage} from '../landing/landing';
import {EntityProvider} from '../../providers/entity/cso';
import {LoadingController} from 'ionic-angular';
import {Assessment} from '../../model/assessment.model';
import {ViewAssessmentPage} from "../view-assessment/view-assessment";
import {LoginPage} from "../login/login";
import {AssessmentService} from "../../service/assessment.service";

export interface AssessmentListResponse {
  assessments: any;
}


@IonicPage()
@Component({
  selector: 'page-display-list-of-assessment',
  templateUrl: 'display-list-of-assessment.html',
})
export class DisplayListOfAssessmentPage {

  originalListOfAssessment: Assessment[] = [];
  filteredListOfAssessment: Assessment[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public assessmentService: AssessmentService,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
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
    const _loader = this.loadingCtrl.create({
      content: "Please wait information is still loading...",
      duration: 300000000
    });

    _loader.present();

    this.assessmentService.list().subscribe((_response: AssessmentListResponse) => {
      this.originalListOfAssessment = _response.assessments;
      this.filteredListOfAssessment = this.originalListOfAssessment;
      _loader.dismiss();
    }, _error => {
      _loader.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Something went wrong, please contact administrator.',
        buttons: ['OK']
      });
      alert.present();
    })
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
