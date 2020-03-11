import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LandingPage } from '../landing/landing';
import { AddOtpPage } from '../add-otp/add-otp';
import { NgModel, NgForm } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';


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
    public authUser: ApiProvider
  ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }
  verifyemail(form: NgForm) {
    this.authUser.verifyUser(form.value.email).subscribe(res => {
      console.log(res)
       if (form.value.email === ''){
        const alert = this.alertCtrl.create({
          title: 'Oops',
          subTitle: 'You did not enter your email address please enter your valid email address',
          buttons: ['OK']
        });
        alert.present();
      }
      else if(typeof (res) == 'undefined'){
        const alert = this.alertCtrl.create({
          title: 'Incorrect email',
          subTitle: 'You have entered an invalid email address',
          buttons: ['OK']
        });
        alert.present();
      }
      else if (typeof (res) != 'undefined') {
        this.navCtrl.push(AddOtpPage);
        const alert = this.alertCtrl.create({
          // title: 'Oops!',
          subTitle: 'Please check your email address for an OTP code.',
          buttons: ['OK']
        });
        alert.present();
      }
    },
    (err) => {console.log(err)});

  }

}
