import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {EntityProvider} from "../../providers/entity/cso";
import {LandingPage} from "../landing/landing";
import {DisplayCsoMemberListPage} from "../display-cso-member-list/display-cso-member-list";
import {DisplayListOfAssessmentPage} from "../display-list-of-assessment/display-list-of-assessment";
import {Assessment} from "../../model/assessment.model";

@IonicPage()
@Component({
  selector: 'page-view-assessment',
  templateUrl: 'view-assessment.html',
})
export class ViewAssessmentPage {
  assessment: Assessment;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: EntityProvider,
    public loadingCtrl: LoadingController,
    public  storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get('current_assessment').then((entity) => {
      this.assessment = entity;
    });
  }

  goBackToAssessmentList() {
    this.navCtrl.push(DisplayListOfAssessmentPage);
  }

  goBackToHomePage(){
    this.navCtrl.push(LandingPage)
  }
}
