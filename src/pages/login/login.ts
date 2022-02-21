import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AddOtpPage} from '../add-otp/add-otp';
import {NgModel, NgForm} from '@angular/forms';
import {AlertController} from 'ionic-angular';
import {AuthService} from "../../service/auth.service";
import { UserAuthService } from '../../service/UserAuth.service'
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { LandingPage } from '../landing/landing';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email:string;
  message: string;
  OptionsArr = new Array();
  Options;
  messages;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authService: AuthService,
    public sqlite :SqliteProvider,
    public UserAuth :UserAuthService
  ) {
      this.sqlite.sqlitestate();
  } 

  getEmail(form: NgForm) {
    if (form.value.email === '') {
      const alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'You did not enter your email address please enter your valid email address.',
        buttons: ['OK']
      });
      alert.present();
    } else {

      this.UserAuth.GetUserDetails(form.value.email).subscribe(_responseGetUser=>{
        console.log(_responseGetUser)
        this.OptionsArr.push(_responseGetUser)
        this.Options = this.OptionsArr[0].Options
        this.messages = this.OptionsArr[0].messages

         if (this.Options == "1"){
          const alert = this.alertCtrl.create({
           cssClass: "myAlert",
           subTitle: this.messages,
           buttons: ['OK']
         });
         alert.present();
        }
        else if (this.Options == "3"){
          const alert = this.alertCtrl.create({
           cssClass: "myAlert",
           subTitle: this.messages,
           buttons: ['OK']
         });
         alert.present();
         return this.navCtrl.push(LandingPage);
        }
      })

      // this.authService.login(form.value.email).subscribe(_responseData => {
      //   this.navCtrl.push(AddOtpPage);
      //   const alert = this.alertCtrl.create({
      //     subTitle: 'Please check your email address for the One Time Password.',
      //     buttons: ['OK']
      //   });
      //   alert.present();
      // }, _error => {
      //   const alert = this.alertCtrl.create({
      //     title: 'Oops',
      //     subTitle: 'Something went wrong, please contact administrator.',
      //     buttons: ['OK']
      //   });
      //   alert.present();
      // });
    }


  }

}
