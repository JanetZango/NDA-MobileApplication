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

  csoObj: any

  //variables
  cso_sector;
  cso_type;
  district;
  municipality;
  name_of_cso;
  province;
  cso_name
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    // this will show data on the card view
    this.viewCSoArr.push(this.navParams.get('orgObject'));
    // this use to transfer cso data
    this.csoObj = this.navParams.get('orgObject');


    this.cso_sector = this.viewCSoArr[0].cso_sector.title
    this.cso_type = this.viewCSoArr[0].cso_type.title
    this.district = this.viewCSoArr[0].district.title
    this.municipality = this.viewCSoArr[0].municipality.title
    this.province = this.viewCSoArr[0].province.title
    this.cso_name = this.viewCSoArr[0].name_of_cso

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewcsodetailsPage');
  }
  //**  */
  gotoback() {
    this.navCtrl.pop();
  }

  // ** move data to the nect page
  seeCsoMmbers() {
    for (var x = 0; x < this.viewCSoArr.length; x++) {
      this.navCtrl.push(DisplayCsoMemberListPage, { orgObject: this.viewCSoArr[x] });
    }
  }
}
