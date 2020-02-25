import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NgModel, NgForm } from '@angular/forms';
import { DisplayListOfCapacityPage } from '../display-list-of-capacity/display-list-of-capacity';
import { LookUpService } from '../../providers/lookup/lookups.service';
import { CapacityBuilding } from '../../model/capacitybuilding-class';
import { EntityProvider } from '../../providers/entity/cso';
import { DataProvider } from '../../providers/dataproviders/dataprovider';


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

  // arrays that store data
  districtArrData = new Array();
  municipalityArrData = new Array();

  capacity: CapacityBuilding = new CapacityBuilding();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public lookupService: LookUpService,
    public entityProvider: EntityProvider,
    public alertCtrl: AlertController,
    public csoProvider: DataProvider,
    public loadingController: LoadingController 
    ) {
      
  }

  

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AddCapacityPage');
    this.getDistrict();
    this.getProvince();
    this.getPartnerType();
    this.getMunicipality();
    this.getCapacityBuilding();
  }

  gotoback(){
    this.navCtrl.push(DisplayListOfCapacityPage)
  }

  /**
   * Get Capacity Building
   */
  getCapacityBuilding(){
    this.lookupService.getCapacityBuildingType().subscribe(res =>{
      this.capacityArr = res;
    })
  }

  /**
   * Get District
   */
  getDistrict(){
    this.lookupService.getDistrict().subscribe(res =>{
      this.districtArrData = res;
    })
  }

  /**
   *  Get Province
   */
  getProvince(){
    this.lookupService.getProvince().subscribe(res =>{
      this.provinceArr = res;
    })
  }
  /**
   * Get Partner Type
   */
  getPartnerType(){
    this.lookupService.getPartnerType().subscribe(res =>{
      this.partnerArr = res;
    })
  }

  /**
   * Get Municipality
   */
  getMunicipality(){
    this.lookupService.getLocalMunicipality().subscribe(res =>{
      this.municipalityArrData = res;
    })
  }

  /**
   * to populate the district by select provice id 
   * @param proviceId
   */
  populateDistrict(proviceId: NgModel){
    this.districtArr =  this.districtArrData
      .filter(x => x.province_id === proviceId);
  }

  /**
   * to populate the Municipality by select district id
   * @param districtId
   */
  populateMunicipality(districtId: NgModel){
    debugger
    this.municipalityArr = this.municipalityArrData
      .filter(m => m.district_id === districtId);
  }

  /**
   * Saving Capacity Building
   * 
   * @param capacity 
   */
  addCapacity(capacity: NgForm){
   
      this.entityProvider.saveCapacityBuilding(capacity.value)
      .subscribe(res =>{
        if(res.status === 201){
          capacity.reset();
        }else{
          const alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: 'Capacity Building Saved',
            buttons: ['OK']
          });
          alert.present();
        }
      });
  }
}
