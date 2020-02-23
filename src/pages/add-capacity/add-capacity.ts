import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgModel } from '@angular/forms';
import { DisplayListOfCapacityPage } from '../display-list-of-capacity/display-list-of-capacity';
import { LookUpService } from '../../providers/lookup/lookups.service';


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


//arrays
  capacityArr = new Array();
  districtArr = new Array();
  provinceArr = new Array();
  municipalityArr = new Array();
  partnerArr = new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams,public lookupService: LookUpService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCapacityPage');
    this.getDistrict();
    this.getProvince();
    this.getPartnerType();
    this.getMunicipality();
    this.getCapacityBuilding();

  
  }

  gotoback(){
    this.navCtrl.push(DisplayListOfCapacityPage)
  }

  getCapacityBuilding(){
    this.lookupService.getCapacityBuildingType().subscribe(res =>{
      console.log(res)
      this.capacityArr = res 
      console.log(this.capacityArr)
    })
  }

  getDistrict(){
    this.lookupService.getDistrict().subscribe(res =>{
      this.districtArr = res 
      console.log(this.districtArr)

    })
  }

  getProvince(){
    this.lookupService.getProvince().subscribe(res =>{
      this.provinceArr = res
      console.log(this.provinceArr)
    })
  }

  getPartnerType(){
    this.lookupService.getPartnerType().subscribe(res =>{
      this.partnerArr = res
      console.log(this.partnerArr)
    })
  }

  getMunicipality(){
    this.lookupService.getLocalMunicipality().subscribe(res =>{
      this.municipalityArr = res
      console.log(this.municipalityArr)
    })
  }



 

}
