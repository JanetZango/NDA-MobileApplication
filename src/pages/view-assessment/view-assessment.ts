import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LandingPage} from "../landing/landing";
import {DisplayListOfAssessmentPage} from "../display-list-of-assessment/display-list-of-assessment";
import {Assessment} from "../../model/assessment.model";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-view-assessment',
  templateUrl: 'view-assessment.html',
})
export class ViewAssessmentPage {
  assessment: Assessment;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
  ) {}

  ngOnInit() {
    this.storage.get('current_assessment').then((entity) => {
      this.assessment = entity;
    });
  }

  logout(){
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

  goBackToAssessmentList() {
    this.navCtrl.push(DisplayListOfAssessmentPage);
  }

  goBackToHomePage(){
    this.navCtrl.push(LandingPage)
  }
}
