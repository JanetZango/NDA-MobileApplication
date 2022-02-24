import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AddCsoMemberPage} from '../add-cso-member/add-cso-member';
import {LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {ViewCsoMemberPage} from '../view-cso-member/view-cso-member';
import {Cso} from "../../model/cso.model";
import {ViewCsoDetailsPage} from "../view-cso-details/view-cso-details";
import {Member} from "../../model/member.model";
import {LandingPage} from "../landing/landing";
import {CsoMemberService} from "../../service/cso-member.service";
import {LoginPage} from "../login/login";

export interface CSoMembersListResponseData {
  cso_members: any;
}


@IonicPage()
@Component({
  selector: 'page-display-cso-member-list',
  templateUrl: 'display-cso-member-list.html',
})
export class DisplayCsoMemberListPage implements OnInit {
  cso: Cso;
  originalListOfCsoMembers: Member[] = [];
  filteredListOfCsoMembers: Member[] = [];
  CsoLoggedIn = new Array();
  CsoID;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public csoMemberService: CsoMemberService,
    public storage: Storage,
    public alertCtrl: AlertController,
  ) {
  }

  ngOnInit() {
    this.storage.get('current_cso').then((entity) => {
      this.cso = entity;
      this.CsoLoggedIn.push(this.cso)
      this.CsoID = this.CsoLoggedIn[0].id
      console.log(this.CsoID)
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
    const _loader = this.loadingCtrl.create({
      content: "Please wait information is still loading...",
      duration: 300000000
    });

    _loader.present();


    this.csoMemberService.ListOfCsoMember0(this.CsoID).subscribe((_response:any) => {
      // this.originalListOfCsoMembers = _response.cso_members;
      this.filteredListOfCsoMembers = _response;
      this.filteredListOfCsoMembers.reverse();
      _loader.dismiss();
    }, _error => {
      _loader.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Something went wrong, please contact administrator.',
        buttons: ['OK']
      });
      alert.present();
    })
  }

  logout(){
    let alert = this.alertCtrl.create({
      title: 'Logout',
      message: 'You are about to logout, do you want to proceed?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.storage.remove('authUser').then(removed => {
              this.navCtrl.push(LoginPage);
            });
          }
        }
      ]
    });
    alert.present();
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

  goBackToHomePage() {
    this.navCtrl.push(LandingPage)
  }

}
