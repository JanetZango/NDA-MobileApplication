import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AddCsoMemberPage} from '../add-cso-member/add-cso-member';
import {LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {EntityProvider} from '../../providers/entity/cso';
import {ViewCsoMemberPage} from '../view-cso-member/view-cso-member';
import {Cso} from "../../model/cso.model";
import {ViewCsoDetailsPage} from "../view-cso-details/view-cso-details";
import {Member} from "../../model/member.model";

@IonicPage()
@Component({
  selector: 'page-display-cso-member-list',
  templateUrl: 'display-cso-member-list.html',
})
export class DisplayCsoMemberListPage implements OnInit {
  cso: Cso;
  originalListOfCsoMembers: Member[] = [];
  filteredListOfCsoMembers: Member[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public api: EntityProvider,
              public  storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get('current_cso').then((entity) => {
      this.cso = entity;
      this._getCsoMembers();
    });
  }

  addCsoMember() {
    this.navCtrl.push(AddCsoMemberPage);
  }

  viewMemberDetails(member: Member) {
    this.storage.set('current_member', member);
    this.navCtrl.push(ViewCsoMemberPage);
  }

  goToLanding() {
    this.navCtrl.pop();
  }

  _getCsoMembers() {
    const loader = this.loadingCtrl.create({
      content: "Please wait information is still loading...",
      duration: 300000000
    });

    loader.present();

    this.api.getCsoMembers(this.cso.guid).subscribe(response => {
      if (response) {
        this.originalListOfCsoMembers = response.cso_members;
        this.filteredListOfCsoMembers = response.cso_members;
      }
      loader.dismiss();
    })
  }

  searchForMember(element: any) {
    const _needle = element.target.value;
    if (_needle === '') {
      this.filteredListOfCsoMembers = this.originalListOfCsoMembers;
      return;
    }
    this.filteredListOfCsoMembers = this.originalListOfCsoMembers.filter((member) => {
      return (member.first_name.toLowerCase().indexOf(_needle.toLowerCase()) > -1);
    })
  }

  goBackToCsoDetails() {
    this.navCtrl.push(ViewCsoDetailsPage);
  }
}
