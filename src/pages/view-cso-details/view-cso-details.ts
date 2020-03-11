import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DisplayCsoMemberListPage} from '../display-cso-member-list/display-cso-member-list';
import {EntityProvider} from '../../providers/entity/cso'
import {Cso} from "../../model/cso.model";
import {DisplayListOfCsoPage} from "../display-list-of-cso/display-list-of-cso";
import {LandingPage} from "../landing/landing";

@IonicPage()
@Component({
  selector: 'page-view-cso-details',
  templateUrl: 'view-cso-details.html',
})
export class ViewCsoDetailsPage {
  cso: Cso;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: EntityProvider,
    public loadingCtrl: LoadingController,
    public  storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get('current_cso').then((entity) => {
      this.cso = entity;
    });
  }

  goToCSOListView() {
    this.navCtrl.push(DisplayListOfCsoPage);
  }

  goBackToHomePage(){
    this.navCtrl.push(LandingPage)
  }

  viewCsoMembers() {
    this.navCtrl.push(DisplayCsoMemberListPage);
  }
}
