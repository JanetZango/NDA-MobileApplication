import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddCapacityPage } from '../add-capacity/add-capacity';
import { LandingPage } from '../landing/landing';
import { EntityProvider } from '../../providers/entity/cso';
import { LoadingController } from 'ionic-angular';

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
export class DisplayListOfCapacityPage implements OnInit {
  DisplayCapacity = new Array();
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public csoApi : EntityProvider,
     public loadingCtrl: LoadingController) {
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
  ngOnInit(){
   this.displayListOfCapacityBuilding();
  }

  // ** display the list of capacity building 
  displayListOfCapacityBuilding(){
    const loader = this.loadingCtrl.create({
      content: "Please wait information is stil loading...",
      duration: 300000000
    });
    loader.present();
    this.csoApi.getCapacityBuilding().subscribe(res => {
      if(res){
        console.log(res.results);
        this.DisplayCapacity = res.results
        console.log(this.DisplayCapacity)
        loader.dismiss()
      }

    })
  }

}
