import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LandingPage } from '../landing/landing';
import { AddOtpPage } from '../add-otp/add-otp';
import { NgModel } from '@angular/forms';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  verifyemail(){
    console.log(this.email)
   if(this.email == null || this.email == undefined || this.email == ''){
      const alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Please enter your email address!',
        buttons: ['OK']
      });
      alert.present()
    
    }
    else{
      this.navCtrl.push(AddOtpPage)
    }
   
  }

}
