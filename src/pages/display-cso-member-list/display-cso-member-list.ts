import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddCsoMemberPage } from '../add-cso-member/add-cso-member';
import { LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { EntityProvider } from '../../providers/entity/cso';
import { ViewCsoMemberPage } from '../view-cso-member/view-cso-member';
import { ViewcsodetailsPage } from '../viewcsodetails/viewcsodetails';
/**
 * Generated class for the DisplayCsoMemberListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-display-cso-member-list',
  templateUrl: 'display-cso-member-list.html',
})
export class DisplayCsoMemberListPage implements OnInit {
 //variables
 cso_uuid;


 //retrieve data array

 csoObj:any 
 DisplayCsoMember:any

 CsoDetailsArr = new Array();
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public loadingCtrl: LoadingController,
     public api:ApiProvider,
     public csoApi:EntityProvider) {
  }

  ionViewDidLoad() {
    this.CsoDetailsArr.push(this.navParams.get('orgObject'));
    this.csoObj =this.navParams.get('orgObject');
    console.log(this.csoObj)
    this.cso_uuid = this.CsoDetailsArr[0].cso_uuid
  }

  addCsoMember(){
    for (var x = 0; x < this.CsoDetailsArr.length; x++) {
      this.navCtrl.push(AddCsoMemberPage, { orgObject: this.csoObj });
    } 
  }

  viewMore(name){
    for (var x = 0; x < this.DisplayCsoMember.length; x++) {
      if(name == this.DisplayCsoMember[x].first_name){
        this.navCtrl.push(ViewCsoMemberPage, { orgObject: this.DisplayCsoMember[x] });
      }
    } 
  }

  gotoLanding(){
    this.navCtrl.pop();
  }
  
  ngOnInit(){
       this.displayCsoList();
    }


    displayCsoList(){
      const loader = this.loadingCtrl.create({
        content: "Please wait information is stil loading...",
        duration: 300000000
      });
      loader.present();
      this.csoApi.getCsoMember().subscribe(res => {
        if(res){
          this.DisplayCsoMember = res.cso_members
          console.log(this.DisplayCsoMember)
          loader.dismiss()
        }
      })
    }

  //** Go back to view deatils of cso */

  goBackToCsoDetails(){
    this.navCtrl.pop();
  }
}
