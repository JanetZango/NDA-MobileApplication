import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DisplayListOfCsoPage } from '../display-list-of-cso/display-list-of-cso';

/**
 * Generated class for the RegistercsoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registercso',
  templateUrl: 'registercso.html',
})
export class RegistercsoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistercsoPage');
  }
  gotoback(){
    this.navCtrl.push(DisplayListOfCsoPage)
  }

}
