import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { NgModel, NgForm } from '@angular/forms';
import { DisplayListOfCsoPage } from '../display-list-of-cso/display-list-of-cso';
import { LookUpService } from '../../providers/lookup/lookups.service';
import { EntityProvider } from '../../providers/entity/cso';
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
  districtArrFilter = new Array();

  // arrays that store data
  districtArrData = new Array();
  municipalityArrData = new Array();


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public lookupService: LookUpService,
     public entityProvider: EntityProvider,
     public alertCtrl: AlertController,) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RegistercsoPage');
    this.getProvince();
    this.getMunicipality();
    this.getDistrict();
    this.getCsoType();
    this.getCsoSector();
  }

 

  gotoback(){
    this.navCtrl.push(DisplayListOfCsoPage)
  }


  // **
  // rest data from the form
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

 /**
   * Get Cso Sector
   */
  getCsoSector(){
    this.lookupService.getCsoSector().subscribe(res =>{
      this.csosectorArr = res
    })
  }
 
 /**
   * Get Cso type
   */
  getCsoType(){
    this.lookupService.getCsoType().subscribe(res =>{
      this.csotypeArr = res
      console.log(this.csotypeArr)
    })
  }

 /**
   * Get province
   */
  getProvince(){
    this.lookupService.getProvince().subscribe(res =>{
      this.provinceArr = res
    })
  }

  /**
   * Get district
   */

  getDistrict(){
    this.lookupService.getDistrict().subscribe(res =>{
      this.districtArr = res 
    })
  }

 /**
   * Get municipality
   */
  getMunicipality(){
    this.lookupService.getLocalMunicipality().subscribe(res =>{
      this.municipalityArr = res
    })
  }

  


    /**
   * to populate the district by select provice id 
   * @param proviceId
   */
  populateDistrict(proviceId: NgModel){
    this.districtArr =  this.districtArrData
      .filter(x => x.province_id === proviceId);
      console.log(this.districtArr);
  }

   /**
   * to populate the Municipality by select district id
   * @param districtId
   */
  populateMunicipality(districtId: NgModel){
    debugger
    this.municipalityArr = this.municipalityArrData
      .filter(m => m.district_id === districtId);
      console.log(this.municipalityArr)
  }

   /**
   * Get registering cso
   */
  addCso(cso: NgForm){
    this.entityProvider.saveCso(cso.value)
      .subscribe(res =>{
        if(res){
          // cso.reset();
          const alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: 'cso registered',
            buttons: ['OK']
          });
          alert.present();
        }else{
          // TODO 
        }
      });
  }

}
