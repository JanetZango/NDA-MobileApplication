import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistercsoPage } from '../registercso/registercso';
import { LandingPage } from '../landing/landing';
import { ApiProvider } from '../../providers/api/api';
import { EntityProvider } from '../../providers/entity/cso'
import { ViewcsodetailsPage } from '../viewcsodetails/viewcsodetails';
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
export class DisplayListOfCsoPage implements OnInit{
  
//variables
  cso;
  DisplayCso = new Array();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api:ApiProvider,
    public csoApi:EntityProvider
    ) {
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
  ngOnInit(){
    this.csoApi.getCso().subscribe(res => {
      
      if(res){
        console.log(res.results);
        this.DisplayCso = res.results
        console.log(this.DisplayCso)
      }

    })


  }
  viewMore(name) {
    for (var x = 0; x < this.DisplayCso.length; x++) {
      if (name == this.DisplayCso[x].nda_registration) {
        this.navCtrl.push(ViewcsodetailsPage, { orgObject: this.DisplayCso[x] });
        break;
      }

    }


  }

}
