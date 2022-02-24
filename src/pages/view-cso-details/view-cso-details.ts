import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DisplayCsoMemberListPage} from '../display-cso-member-list/display-cso-member-list';
import {Cso} from "../../model/cso.model";
import {DisplayListOfCsoPage} from "../display-list-of-cso/display-list-of-cso";
import {LandingPage} from "../landing/landing";
import {LoginPage} from "../login/login";
import {AddAssessmentPage} from "../add-assessment/add-assessment";

@IonicPage()
@Component({
  selector: 'page-view-cso-details',
  templateUrl: 'view-cso-details.html',
})
export class ViewCsoDetailsPage implements OnInit {
  cso: Cso;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
  ) {}

  ngOnInit() {
    this.storage.get('current_cso').then((entity) => {
      this.cso = entity;
      console.log(this.cso)
    });
  }

  goToCSOListView() {
    this.navCtrl.push(DisplayListOfCsoPage);
  }

  goToAddAssessment(){
    this.navCtrl.push(AddAssessmentPage);
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

  goBackToHomePage(){
    this.navCtrl.push(LandingPage)
  }

  viewCsoMembers() {
    this.navCtrl.push(DisplayCsoMemberListPage);
  }
}
