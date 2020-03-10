import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AddCsoMemberPage} from '../add-cso-member/add-cso-member';
import {LoadingController} from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import {EntityProvider} from '../../providers/entity/cso';
import {ViewCsoMemberPage} from '../view-cso-member/view-cso-member';
import {ViewCsoDetailsPage} from '../view-cso-details/view-cso-details';

/**
 * Generated class for the DisplayCsoMemberListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-display-cso-member-list',
  templateUrl: 'display-cso-member-list.html',
})
export class DisplayCsoMemberListPage implements OnInit {

  cso_guid: any;
  listOfCsoMembers = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public api: EntityProvider)
  {
    this.cso_guid = this.navParams.get('cso_guid');
  }

  ionViewDidLoad() {

  }

  addCsoMember() {
      this.navCtrl.push(AddCsoMemberPage, {cso_guid: this.cso_guid});
  }

  viewMemberDetails(member_guid) {
    this.navCtrl.push(ViewCsoMemberPage, {member_guid: member_guid});
  }

  goToLanding() {
    this.navCtrl.pop();
  }

  ngOnInit() {
    this.getCsoMembers();
  }


  getCsoMembers() {

    const loader = this.loadingCtrl.create({
      content: "Please wait information is still loading...",
      duration: 300000000
    });

    loader.present();

    this.api.getCsoMembers(this.cso_guid).subscribe(response => {
      if (response) {
        this.listOfCsoMembers = response.cso_members;
      }
      loader.dismiss();
    })
  }

  goBackToCsoDetails() {
    this.navCtrl.pop();
  }
}
