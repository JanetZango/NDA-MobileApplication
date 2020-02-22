import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistercsoPage } from '../registercso/registercso';
import { LandingPage } from '../landing/landing';
import { ApiProvider } from '../../providers/api/api';
import { EntityProvider } from '../../providers/entity/cso'
/**
 * Generated class for the DisplayListOfCsoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-display-list-of-cso',
  templateUrl: 'display-list-of-cso.html',
})
export class DisplayListOfCsoPage {
  
//variables
  cso;
  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider,public csoApi:EntityProvider) {
    this.cso = this.csoApi.getcso()
    console.log(this.cso)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayListOfCsoPage');
  }
  registerCSO(){
    this.navCtrl.push(RegistercsoPage)
  }
  gotoLanding(){
    this.navCtrl.push(LandingPage)
  }

}
