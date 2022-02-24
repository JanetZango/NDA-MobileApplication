import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LandingPage} from '../landing/landing';
import {AlertController} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {AuthService} from "../../service/auth.service";
import {User} from "../../model/user.model";
import {Storage} from "@ionic/storage";
import {UserService} from "../../service/user.service";
import { UserAuthService } from "../../service/UserAuth.service"

export interface AuthResponseData {
  guid: string;
  email: string;
  full_name: string;
  province_guid: string;
  access_token: string;
  access_token_expiration_date: number;
  refresh_token: string;
  refresh_token_expiration_date: number;
}

@IonicPage()
@Component({
  selector: 'page-add-otp',
  templateUrl: 'add-otp.html',
})
export class AddOtpPage {
  CurrentUser;
  CurrentEmailUser;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public authService: AuthService,
    private storage: Storage,
    public userService: UserService,
    public navParams: NavParams,
    public UserAuth:UserAuthService
  ) {
    this.CurrentUser = this.navParams.get('Uzer')
    console.log(this.CurrentUser.email)
    this.CurrentEmailUser = this.CurrentUser.email
  }

  verifyOTP(otpForm: NgForm) {
    if (otpForm.value.otp === '') {
      const alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'You did not enter the One Time Password, please enter One Time Password.',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.UserAuth.getOtpCode(this.CurrentEmailUser,otpForm.value.otp).subscribe((_responseData) => {
        console.log(_responseData)
        // let date = new Date();
        // date.setDate(date.getDate() + _responseData.refresh_token_expiration_date);
        // const refreshTokenExpirationDate = date;
        // const accessTokenExpirationDate = new Date(new Date().getTime() + _responseData.access_token_expiration_date * 1000);

        let user = new User(
          this.CurrentUser.id,
          this.CurrentUser.full_name,
          this.CurrentUser.email,
          this.CurrentUser.province_id,
          this.CurrentUser.verification_token,
        //   accessTokenExpirationDate,
        //   _responseData.refresh_token,
        //   refreshTokenExpirationDate
        // );
        )

        // this.userService.guid = _responseData.guid;
        // this.userService.full_name = _responseData.full_name;
        // this.userService.email = _responseData.email;
        // this.userService.province_guid = _responseData.province_guid;
        // this.userService.access_token = _responseData.access_token;
        // this.userService.refresh_token = _responseData.refresh_token;
        // this.userService.access_token_expiration_date = accessTokenExpirationDate;
        // this.userService.refresh_token_expiration_date = refreshTokenExpirationDate;

        this.storage.set('authUser', user);
        return this.navCtrl.push(LandingPage);
      }, _error => {
        // if (_error.status === 404) {
        //   const alert = this.alertCtrl.create({
        //     subTitle: 'Please enter a valid the One Time Password.',
        //     buttons: ['OK']
        //   });
        //   alert.present();
        // } else {
        //   const alert = this.alertCtrl.create({
        //     title: 'Oops',
        //     subTitle: 'Something went wrong, please contact administrator.',
        //     buttons: ['OK']
        //   });
        //   alert.present();
        // }
      });
    }
  }
}
