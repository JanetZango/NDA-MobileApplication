import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LandingPage } from '../landing/landing';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the AddOtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-otp',
  templateUrl: 'add-otp.html',
})
export class AddOtpPage {
  otp
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddOtpPage');
  }
  login(){
    console.log(this.otp)
    if(this.otp == null || this.otp == undefined || this.otp == ''){
      const alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Please enter your OTP code!',
        buttons: ['OK']
      });
      alert.present()
    }
    else{
      this.navCtrl.push(LandingPage)
    }
   
  }

}
