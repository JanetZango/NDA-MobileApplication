import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {EntityProvider} from "../../providers/entity/cso";
import {AddCsoMemberPage} from "../add-cso-member/add-cso-member";
import {Member} from "../../model/member.model";

@IonicPage()
@Component({
  selector: 'page-view-cso-member',
  templateUrl: 'view-cso-member.html',
})
export class ViewCsoMemberPage {
  member: Member;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: EntityProvider,
    public loadingCtrl: LoadingController,
    public  storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get('current_member').then((entity) => {
      this.member = entity;
    });
  }

  addCsoMember() {
    this.navCtrl.push(AddCsoMemberPage);
  }

  goBack() {
    this.navCtrl.pop();
  }
}
