import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddCapacityPage } from '../add-capacity/add-capacity';
import { LandingPage } from '../landing/landing';


/**
 * Generated class for the DisplayListOfCapacityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-display-list-of-capacity',
  templateUrl: 'display-list-of-capacity.html',
})
export class DisplayListOfCapacityPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayListOfCapacityPage');
  }
  addBuilding(){
    this.navCtrl.push(AddCapacityPage)
  }
  gotoback(){
    this.navCtrl.push(LandingPage)
  }

}
