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
  items;
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
        // console.log(this.DisplayCso.cso_name)
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
    // this.namesArr = this.sqliteService.getName();
    // console.log(this.namesArr)
  }

}
