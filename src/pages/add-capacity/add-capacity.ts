import { Component } from '@angular/core';
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
  DisplayCso = new Array();

  // arrays that store data
  districtArrData = new Array();
  municipalityArrData = new Array();


  //variables
  items
  start_date;
  cso_name;
  capacity_building_type_id;
  province_id;
  district_id;
  municipality_id;
  partner_id;
  venue;
  facilitator_name;
  funding_source_id;
  collected_by;
 
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

  disableData(){
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("txtDate")[0].setAttribute('min', this.start_date);
  }
  

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AddCapacityPage');
    this.getDistrict();
    this.getProvince();
    this.getPartnerType();
    this.getMunicipality();
    this.getCapacityBuilding();

    this.displayCsoList();
  }

 
  reset(){
    this.start_date="";
    this.cso_name="";
    this.capacity_building_type_id="";
    this.province_id="";
    this.district_id="";
    this.municipality_id="";
    this.partner_id="";
    this.venue="";
    this.facilitator_name="";
    this.funding_source_id="";
    this.collected_by="";
  }


  // ** to back to capacity building list
  goBackToCapacityBuildingList(){
    this.navCtrl.pop();
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
      console.log(this.districtArr)
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
   * Saving Capacity Building
   * 
   * @param capacity 
   */
  addCapacity(capacity: NgForm){
     this.entityProvider.saveCapacityBuilding(capacity.value).subscribe(res => {
       if( this.start_date=="" || this.start_date== null ||
       this.cso_name=="" || this.cso_name==null ||
       this.capacity_building_type_id=="" ||this.capacity_building_type_id==null||
       this.province_id=="" ||     this.province_id==null||
       this.district_id=="" ||  this.district_id==null ||
       this.municipality_id=="" || this.municipality_id==null||
       this.partner_id=="" ||  this.partner_id==null ||
       this.venue=="" ||  this.venue==null||
       this.facilitator_name=="" ||     this.facilitator_name==null||
       this.funding_source_id=="" ||  this.funding_source_id==null||
       this.collected_by=="" ||  this.collected_by==null ){
        const alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Please complete your capacity building form',
          buttons: ['OK']
        });
        alert.present();
     
       }
      else if (typeof (res) != 'undefined') {
        const alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Capacity Building Saved',
          buttons: ['OK']
        });
        alert.present();
        this.reset()
      }
      else {
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Please enter your email address!',
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

    // ** search by name
    displayCsoList(){
      this.entityProvider.getCso().subscribe(res => {
        if(res){
          console.log(res.results);
          this.DisplayCso = res.results
          this.storeNames();
          console.log(this.DisplayCso[0].cso_name)
          for(var x =0; x < this.DisplayCso.length;x ++){
            this.storeOrgNames(this.DisplayCso[x].cso_name)
             
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


  /**
   * 
   * @param ev 
   * 
   */
  getItems(ev: any){
    const val = ev.target.value;
    this.items = this.csoProvider.listOfCso.filter((x) => {
          return (x.cso_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
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

// ** find cso id by using name

/**
 * 
 * @param name 
 * @param capacity 
 */
openMarkerInfo(name, capacity: NgForm){
  capacity.controls['cso_name'].setValue(name.cso_name);
  this.items = []
}

}
