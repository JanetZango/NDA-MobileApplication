import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AddCsoMemberPage} from "../add-cso-member/add-cso-member";
import {Member} from "../../model/member.model";
import {LandingPage} from "../landing/landing";
import {DisplayCsoMemberListPage} from "../display-cso-member-list/display-cso-member-list";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-view-cso-member',
  templateUrl: 'view-cso-member.html',
})
export class ViewCsoMemberPage {
  member: Member;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
  ) {
  }

  ngOnInit() {
    this.storage.get('current_member').then((entity) => {
      this.member = entity;
    });
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

  addCsoMember() {
    this.navCtrl.push(AddCsoMemberPage);
  }

  goBackToHomePage() {
    this.navCtrl.push(LandingPage)
  }

  goBackToMemberList() {
    this.navCtrl.pop();
  }
}
