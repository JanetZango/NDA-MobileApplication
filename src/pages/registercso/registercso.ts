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
  Mobilisation_date;
  collected_by;
  contactValidation;


  //arrays
  csotypeArr = new Array();
  districtArr = new Array();
  provinceArr = new Array();
  municipalityArr = new Array();
  csosectorArr = new Array();

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
    this.navCtrl.pop();
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
    this.Mobilisation_date="";
    this.cso_sector_id="";
    this.collected_by ="";
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
      this.districtArrData = res 
    })
  }

 /**
   * Get municipality
   */
  getMunicipality(){
    this.lookupService.getLocalMunicipality().subscribe(res =>{
      this.municipalityArrData = res
    })
  }

  


    /**
   * to populate the district by select provice id 
   * @param proviceId
   */
  populateDistrict(proviceId: NgModel){
    this.districtArr =  this.districtArrData
      .filter(x => x.province_id === proviceId);
      console.log(this.districtArrData);
  }

   /**
   * to populate the Municipality by select district id
   * @param districtId
   */
  populateMunicipality(districtId: NgModel){
    
    this.municipalityArr = this.municipalityArrData
      .filter(m => m.district_id === districtId);
      console.log(this.municipalityArr)
  }

   /**
   * Get registering cso
   */

  

  addCso(cso: NgForm){
    this.phonenumberValidatinservice()
     this.entityProvider.saveCso(cso.value).subscribe(res =>{
       if(this.cso_name ==null || this.cso_name == '' || 
       this.cso_mobilisation_method_id == null  || this.cso_mobilisation_method_id  == '' ||
       this.physical_address == null || this.physical_address =='' ||
       this.cso_type_id == null || this.cso_type_id =='' ||
       this.province_id == null ||   this.province_id ==''||
       this.district_id == null ||   this.district_id =='' ||
       this.ward_number ==null || this.ward_number ==''||
       this.contact_number ==null ||this.contact_number ==''||
       this.total_staff ==null || this.total_staff ==''||
       this.collected_by ==null ||this.collected_by ==''||
       this.contact_person ==null ||  this.contact_person ==''||
       this.Mobilisation_date ==null ||   this.Mobilisation_date ==''||
       this.cso_sector_id ==null || this.cso_sector_id ==''
       ){
        const alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Please complete the form to register a new CSO',
          buttons: ['OK']
        });
        alert.present();
       }
       else if(this.contactValidation ==1){
        const alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Oops your phone number is incorrect',
          buttons: ['OK']
        });
        alert.present();

       }
      else if (typeof (res) != 'undefined') {
        const alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'CSO successfully registered',
          buttons: ['OK']
        });
        alert.present();
        this.reset();
      }
      else {
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Oops your information was not saved correctly!',
          buttons: ['OK']
        });
        alert.present();
      }
    }, (err) => {
      const alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Something went wrong!',
        buttons: ['OK']
      });
      alert.present();

    });
  }


  phonenumberValidatinservice() {
    if (this.contact_number == undefined) {
    } else {
      var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
      if (this.contact_number.match(phoneno)) {
        console.log(this.contact_number.match(phoneno));
        this.contactValidation = 0;
      }
      else {
        this.contactValidation = 1;
        console.log(this.contact_number.match(phoneno));
        console.log("wrong");

      }

    }



    //VALIDATIONS FOR services

  }


}
