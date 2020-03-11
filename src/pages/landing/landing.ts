import {Component, OnInit} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { DisplayListOfCsoPage } from '../display-list-of-cso/display-list-of-cso';
import { DisplayListOfAssessmentPage } from '../display-list-of-assessment/display-list-of-assessment';
import { DisplayListOfCapacityPage } from '../display-list-of-capacity/display-list-of-capacity';
import { AsynPage } from '../asyn/asyn';
import { EntityProvider } from '../../providers/entity/cso';
import { DataProvider } from '../../providers/dataproviders/dataprovider';
import {ViewCsoDetailsPage} from "../view-cso-details/view-cso-details";
import {LoginPage} from "../login/login";
import {ApiProvider} from "../../providers/api/api";

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage implements OnInit {
  userDetails = "";
  refreshToken = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authUser: ApiProvider,
    public csoProvider: DataProvider,
    public loadingCtrl: LoadingController
    ) {
    this.userDetails = localStorage.getItem('USER_INFO');
    this.refreshToken = localStorage.getItem('REFRESH_TOKEN');
  }

  ngOnInit(): void {
    if(this.refreshToken !== "undefined"){
      const _loader = this.loadingCtrl.create({
        content: "Please wait information is still loading...",
        duration: 300000000
      });

      _loader.present();

      this.authUser.refreshToken().subscribe(response => {
        _loader.dismiss();
      })
    }else{
      this.navCtrl.push(LoginPage)
    }
  }



  DisplayListOfCSO(){
      this.navCtrl.push(DisplayListOfCsoPage)
  }
  DisplayListOfAssessment(){
      this.navCtrl.push(DisplayListOfAssessmentPage)
  }
  DisplayListOfCapacity(){
      this.navCtrl.push(DisplayListOfCapacityPage)

  }
   gotoAsync(){
       this.navCtrl.push(AsynPage)
  }

}
