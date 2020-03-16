import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LandingPage} from '../landing/landing';
import {AddOtpPage} from '../add-otp/add-otp';
import {NgModel, NgForm} from '@angular/forms';
import {AlertController} from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import {AuthService} from "../../service/auth.service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email;
  message

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authService: AuthService
  ) {}

  getEmail(form: NgForm) {
    if (form.value.email === '') {
      const alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'You did not enter your email address please enter your valid email address.',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.authService.login(form.value.email).subscribe(_responseData => {
        this.navCtrl.push(AddOtpPage);
        const alert = this.alertCtrl.create({
          subTitle: 'Please check your email address for the One Time Password.',
          buttons: ['OK']
        });
        alert.present();
      }, _error => {
        const alert = this.alertCtrl.create({
          title: 'Oops',
          subTitle: 'Something went wrong, please contact administrator.',
          buttons: ['OK']
        });
        alert.present();
      });
    }


  }

}
