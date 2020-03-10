import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {EntityProvider} from "../../providers/entity/cso";

/**
 * Generated class for the ViewCsoMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-cso-member',
  templateUrl: 'view-cso-member.html',
})
export class ViewCsoMemberPage {

  member_guid: any;
  member = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: EntityProvider,
    public loadingCtrl: LoadingController
  ) {
    this.member_guid = this.navParams.get('member_guid');
  }

  ngOnInit() {
    this.getCsoMember();
  }

  getCsoMember() {

    const loader = this.loadingCtrl.create({
      content: "Please wait information is still loading...",
      duration: 300000000
    });

    loader.present();

    this.api.getCsoMemberByGuid(this.member_guid).subscribe(response => {
      if (response) {
        this.member = response.cso_member;
      }
      loader.dismiss();
    })
  }

  goBack() {
    this.navCtrl.pop();
  }
}
