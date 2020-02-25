import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddCsoMemberPage } from '../add-cso-member/add-cso-member';

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
export class DisplayCsoMemberListPage {
 //variables
 cso_uuid;


 //retrieve data array

 csoObj:any 

 CsoDetailsArr = new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.CsoDetailsArr.push(this.navParams.get('orgObject'));
    this.csoObj =this.navParams.get('orgObject');

    console.log(this.CsoDetailsArr)
    this.cso_uuid = this.CsoDetailsArr[0].cso_uuid
    console.log(this.cso_uuid)
  }

  addCsoMember(){
    for (var x = 0; x < this.CsoDetailsArr.length; x++) {
      this.navCtrl.push(AddCsoMemberPage, { orgObject: this.csoObj });
    } 
  }

}
