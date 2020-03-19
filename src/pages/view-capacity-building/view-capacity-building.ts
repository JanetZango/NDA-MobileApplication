import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LandingPage} from "../landing/landing";
import {DisplayListOfAssessmentPage} from "../display-list-of-assessment/display-list-of-assessment";
import {AddCapacityPage} from "../add-capacity/add-capacity";
import {CapacityBuilding} from "../../model/capacitybuilding.model";
import {LoginPage} from "../login/login";
import { DisplayListOfCapacityPage } from '../display-list-of-capacity/display-list-of-capacity';

@IonicPage()
@Component({
  selector: 'page-view-capacity-building',
  templateUrl: 'view-capacity-building.html',
})
export class ViewCapacityBuildingPage {
  capacityBuilding: CapacityBuilding;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.storage.get('current_capacity_building').then((entity) => {
      this.capacityBuilding = entity;
    });
  }

  createCapacityBuilding(){
    this.navCtrl.push(AddCapacityPage);
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

  goBackToAssessmentList() {
    this.navCtrl.pop();
  }

  goBackToHomePage(){
    this.navCtrl.push(LandingPage)
  }
}
