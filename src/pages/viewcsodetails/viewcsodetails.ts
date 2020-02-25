import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DisplayListOfCsoPage } from '../display-list-of-cso/display-list-of-cso';
import { ViewCsoMemberPage } from '../view-cso-member/view-cso-member';
import { DisplayCsoMemberListPage } from '../display-cso-member-list/display-cso-member-list';

/**
 * Generated class for the ViewcsodetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewcsodetails',
  templateUrl: 'viewcsodetails.html',
})
export class ViewcsodetailsPage {
  viewCSoArr = new Array();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.viewCSoArr.push(this.navParams.get('orgObject'));
    console.log(this.viewCSoArr);
 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewcsodetailsPage');
  }
   //**  */
   gotoback(){
     this.navCtrl.pop();
   }

  // ** move data to the nect page
  seeCsoMmbers(){
      for (var x = 0; x < this.viewCSoArr.length; x++) {
          this.navCtrl.push(DisplayCsoMemberListPage, { orgObject: this.viewCSoArr[x] });
          
      }
  }

}
