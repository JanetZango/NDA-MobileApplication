import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  csoObj:any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    // this will show data on the card view
    this.viewCSoArr.push(this.navParams.get('orgObject'));
    // this use to transfer cso data
    this.csoObj =this.navParams.get('orgObject');
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
      this.navCtrl.push(DisplayCsoMemberListPage, { orgObject: this.csoObj });

  }

  

}
