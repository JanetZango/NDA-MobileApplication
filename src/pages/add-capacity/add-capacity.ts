import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgModel } from '@angular/forms';
import { DisplayListOfCapacityPage } from '../display-list-of-capacity/display-list-of-capacity';

/**
 * Generated class for the AddCapacityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-capacity',
  templateUrl: 'add-capacity.html',
})
export class AddCapacityPage {
  Start_date;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCapacityPage');
  }
  disableDatesOnCalender(){
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("txtDate")[0].setAttribute('min', this.Start_date);
  }
  gotoback(){
    this.navCtrl.push(DisplayListOfCapacityPage)
  }

}
