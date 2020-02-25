import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  //variables
  cso_uuid;


  //retrieve data array

  CsoDetailsArr = new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.CsoDetailsArr.push(this.navParams.get('orgObject'));
    console.log(this.CsoDetailsArr)
  
    
  }

  // ** go back to cso member list
  gotoback(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ViewCsoMemberPage');
   
  }

}
