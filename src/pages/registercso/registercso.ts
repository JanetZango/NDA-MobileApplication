import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgModel, NgForm } from '@angular/forms';
import { DisplayListOfCsoPage } from '../display-list-of-cso/display-list-of-cso';
import { LookUpService } from '../../providers/lookup/lookups.service';
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
  

  //variables
  cso_name;
  cso_mobilisation_method_id;
  created_date;
  physical_address;
  cso_type_id;
  cso_sector_id;
  province_id;
  district_id;
  municipality_id;
  ward_number;
  contact_person;
  contact_number;
  total_staff;
  Collected_by

  //arrays
  csotypeArr = new Array();
  districtArr = new Array();
  provinceArr = new Array();
  municipalityArr = new Array();
  csosectorArr = new Array();


  constructor(public navCtrl: NavController, public navParams: NavParams,public lookupService: LookUpService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistercsoPage');
    this.getProvince();
    this.getMunicipality();
    this.getDistrict();
    this.getCsoType();
    this.getCsoSector();
  }

 

  gotoback(){
    this.navCtrl.push(DisplayListOfCsoPage)
  }
  reset(){
    this.cso_name="";
    this.cso_mobilisation_method_id="";
    this.created_date ="";
    this.physical_address="";
    this.cso_type_id="";
    this.province_id ="";
    this.cso_type_id="";
    this.district_id="";
    this.ward_number="";
    this.contact_number="";
    this.total_staff="";
    this.Collected_by="";
    this.contact_person="";
  }

  getCsoType(){
    this.lookupService.getCsoType().subscribe(res =>{
      this.csotypeArr = res
      console.log(this.csotypeArr)
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
  getMunicipality(){
    this.lookupService.getLocalMunicipality().subscribe(res =>{
      this.municipalityArr = res
      console.log(this.municipalityArr)
    })
  }

  getCsoSector(){
    this.lookupService.getCsoSector().subscribe(res =>{
      this.csosectorArr = res
      console.log(this.csosectorArr)
    })
  }
  addCapacity(capacity: NgForm){
    console.log(JSON.stringify(capacity.value));
    debugger
  }

}
