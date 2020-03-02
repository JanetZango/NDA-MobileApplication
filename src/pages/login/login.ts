import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LandingPage } from '../landing/landing';
import { AddOtpPage } from '../add-otp/add-otp';
import { NgModel, NgForm } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

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
      if (typeof (res) != 'undefined') {
        this.navCtrl.push(AddOtpPage);
      }
      else if (form.value.email === ''){
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Please enter your email address!',
          buttons: ['OK']
        });
        alert.present();
      }
     
    },
    (err) => {console.log(err)});
    
  }

}
