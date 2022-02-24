import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DisplayListOfCsoPage} from '../display-list-of-cso/display-list-of-cso';
import {DisplayListOfAssessmentPage} from '../display-list-of-assessment/display-list-of-assessment';
import {DisplayListOfCapacityPage} from '../display-list-of-capacity/display-list-of-capacity';
import { Storage } from '@ionic/storage';
import {LoginPage} from "../login/login";
import {AuthService} from "../../service/auth.service";
import {User} from "../../model/user.model";
import {UserService} from "../../service/user.service";

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage implements OnInit {
  authUser: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    private storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public userService: UserService
  ) {}

  ngOnInit(): void {
     this.storage.get('authUser').then((storageAuthUser: User) => {
        if(storageAuthUser !== null|| this.userService.guid !== "undefined"){
          this.authUser = storageAuthUser;
          if(this.authUser){
            this.userService.full_name = this.authUser.full_name;
            this.userService.email = this.authUser.email;
            // this.userService.guid = this.authUser.guid;
            // this.userService.province_guid = this.authUser.province_guid;
            // this.userService.access_token = this.authUser.access_token;
            // this.userService.refresh_token = this.authUser.refresh_token;
            // this.userService.access_token_expiration_date = this.authUser.access_token_expiration_date;
            // this.userService.refresh_token_expiration_date = this.authUser.refresh_token_expiration_date;
          } else {
            return this.navCtrl.push(LoginPage);
          }

        } else {
          return this.navCtrl.push(LoginPage);
        }
     });

  }

  displayListOfCSO() {
    this.navCtrl.push(DisplayListOfCsoPage)
  }

  displayListOfAssessment() {
    this.navCtrl.push(DisplayListOfAssessmentPage)
  }

  displayListOfCapacity() {
    this.navCtrl.push(DisplayListOfCapacityPage)
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
}
