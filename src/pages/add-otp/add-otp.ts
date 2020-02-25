import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LandingPage } from '../landing/landing';
import { AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { NgForm } from '@angular/forms';
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authUser: ApiProvider
    ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AddOtpPage');
  }
  
  login(otpf: NgForm){

    if (otpf.value.otp === '') {
     return   
     }

     this.authUser.verifyOpt(otpf.value.otp).subscribe(res =>{
      if (typeof (res) != 'undefined') {
        this.navCtrl.push(LandingPage);
      }
      else {
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Please enter your otp code!',
          buttons: ['OK']
        });
        alert.present();
      }
    }, (err) => {
      const alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Something went wrong!',
        buttons: ['OK']
      });
      alert.present();

    });
  }


}
