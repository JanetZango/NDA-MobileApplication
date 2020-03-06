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
  DisplayCso = new Array();
  DisplayCapacity = new Array();
  items;
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
   this.displayCsoList();
  }

  // ** display the list of capacity building 
  displayListOfCapacityBuilding(){
    const loader = this.loadingCtrl.create({
      content: "Please wait information is stil loading...",
      duration: 300000000
    });
    loader.present();
    this.csoApi.getCapacityBuilding().subscribe(res => {
      debugger
      if(res){
        console.log(res.capacity_buildings);
        this.DisplayCapacity = res.capacity_buildings
        console.log(this.DisplayCapacity)
        loader.dismiss()
      }

    })
  }

  displayCsoList(){
    const loader = this.loadingCtrl.create({
      content: "Please wait information is still loading...",
      duration: 300000000
    });
    loader.present();
    this.csoApi.getCapacityBuilding().subscribe(res => {
      if(res){
        this.DisplayCso = res.capacity_buildings
        this.storeNames();
        loader.dismiss()
        for(var x =0; x < this.DisplayCso.length;x ++){
          this.storeOrgNames(this.DisplayCso[x].capacity_building)
           
        }
      }
    })
  }
  CsoName = new Array();
  storeOrgNames(cso_name) {
    this.CsoName.push(cso_name);
    console.log(this.CsoName)
  }

  getCsoName(){
    return this.CsoName
    
  }

  getItems(ev: any) {
    console.log(`hi serach`);
    this.initializeItems();
    // this.searchlist = true
    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      let searchlist = document.getElementsByClassName('searchitem') as HTMLCollectionOf<HTMLElement>;
      //searchlist[0].style.display = 'block';
    }
    else {
      this.items = []
    }
  }

  initializeItems() {
    this.items = []
    this.items = this.namesArr
    console.log(this.items)
  }
  namesArr = new Array()
  storeNames() {
    this.namesArr = this.CsoName;
    console.log(this.namesArr)
  }


}
