import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { DisplayCsoMemberListPage } from '../display-cso-member-list/display-cso-member-list';
import {EntityProvider} from '../../providers/entity/cso'

@IonicPage()
@Component({
  selector: 'page-view-cso-details',
  templateUrl: 'view-cso-details.html',
})
export class ViewCsoDetailsPage {

  csoDetail: any
  cso_guid: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: EntityProvider,
    public loadingCtrl: LoadingController
  )
  {
    this.cso_guid = this.navParams.get('cso_guid');
  }

  ngOnInit() {
    this.getCsoDetail();
  }

  getCsoDetail() {

    const loader = this.loadingCtrl.create({
      content: "Please wait information is still loading...",
      duration: 300000000
    });

    loader.present();

    this.api.getCsoByGuid(this.cso_guid).subscribe(response => {
      if (response) {
        this.csoDetail = response.cso;
      }
      loader.dismiss();
    })
  }

  goBack() {
    this.navCtrl.pop();
  }

  viewCsoMembers() {
    this.navCtrl.push(DisplayCsoMemberListPage, { cso_guid:this.cso_guid});
  }
}
