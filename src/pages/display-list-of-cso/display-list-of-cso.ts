import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistercsoPage } from '../registercso/registercso';
import { ApiProvider } from '../../providers/api/api';
import { EntityProvider } from '../../providers/entity/cso'
import { ViewcsodetailsPage } from '../viewcsodetails/viewcsodetails';
import { LoadingController } from 'ionic-angular';
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
  filteedRe;
  name;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api:ApiProvider,
    public csoApi:EntityProvider,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayListOfCsoPage');
  }
  registerCSO(){
    this.navCtrl.push(RegistercsoPage)
  }
  gotoLanding(){
    this.navCtrl.pop();
  }
  ngOnInit(){
  this.displayCsoList();
  }

  displayCsoList(){
    const loader = this.loadingCtrl.create({
      content: "Please wait information is still loading...",
      duration: 300000000
    });
    loader.present();
    this.csoApi.getCso().subscribe(res => {
      if(res){
        console.log(res.results);
        this.DisplayCso = res.results
        this.storeNames();
        loader.dismiss()
        console.log(this.DisplayCso[0].name_of_cso)
        for(var x =0; x < this.DisplayCso.length;x ++){
          this.storeOrgNames(this.DisplayCso[x].name_of_cso)
           
        }
      }
    })
  }cso_name
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


  /**
   * 
   * @param cso 
   */
  viewMore(cso) {
    this.navCtrl.push(ViewcsodetailsPage, { orgObject: cso});
  }

  viewSearched(name) {
    for (var x = 0; x < this.DisplayCso.length; x++) {
      if (name == this.DisplayCso[x].cso_name) {
        this.navCtrl.push(ViewcsodetailsPage, { orgObject: this.DisplayCso[x] });
        break;
      }
    }
  }


  



}
