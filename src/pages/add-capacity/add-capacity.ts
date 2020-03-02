import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NgModel, NgForm,Validators, FormBuilder, FormGroup } from '@angular/forms';
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
  private authForm : FormGroup;
  capacity: CapacityBuilding = new CapacityBuilding();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public lookupService: LookUpService,
    public entityProvider: EntityProvider,
    public alertCtrl: AlertController,
    public csoProvider: DataProvider,
    public loadingController: LoadingController,
    private fb: FormBuilder
  ) {

    this.authForm = this.fb.group({  
      'cso_name': ['', Validators.compose([Validators.required])],
      'capacity_building_type_id': ['', Validators.compose([Validators.required])],
      'province_id': ['', Validators.compose([Validators.required])],
      'district_id': ['', Validators.compose([Validators.required])],
      'municipality_id': ['', Validators.compose([Validators.required])],
      'partner_id': ['', Validators.compose([Validators.required])],
      'venue': ['', Validators.compose([Validators.required])],
      'facilitator_name': ['', Validators.compose([Validators.required])],
      'funding_source_id': ['', Validators.compose([Validators.required])],
      'collected_by': ['', Validators.compose([Validators.required])],
      'start_date': ['', Validators.compose([Validators.required])],
      'end_date': ['', Validators.compose([Validators.required])],


  });
  }

  disableData() {
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


  reset() {
    this.start_date = "";
    this.cso_name = "";
    this.capacity_building_type_id = "";
    this.province_id = "";
    this.district_id = "";
    this.municipality_id = "";
    this.partner_id = "";
    this.venue = "";
    this.facilitator_name = "";
    this.funding_source_id = "";
    this.collected_by = "";
  }


  // ** to back to capacity building list
  goBackToCapacityBuildingList() {
    this.navCtrl.pop();
  }

  /**
   * Get Capacity Building
   */
  getCapacityBuilding() {
    this.lookupService.getCapacityBuildingType().subscribe(res => {
      this.capacityArr = res;
    })
  }

  /**
   * Get District
   */
  getDistrict() {
    this.lookupService.getDistrict().subscribe(res => {
      this.districtArrData = res;
    })
  }

  /**
   *  Get Province
   */
  getProvince() {
    this.lookupService.getProvince().subscribe(res => {
      this.provinceArr = res;
    })
  }
  /**
   * Get Partner Type
   */
  getPartnerType() {
    this.lookupService.getPartnerType().subscribe(res => {
      this.partnerArr = res;
    })
  }

  /**
   * Get Municipality
   */
  getMunicipality() {
    this.lookupService.getLocalMunicipality().subscribe(res => {
      this.municipalityArrData = res;
    })
  }

  /**
   * to populate the district by select provice id 
   * @param proviceId
   */
  populateDistrict(proviceId: NgModel) {
    this.districtArr = this.districtArrData
      .filter(x => x.province_id === proviceId);
  }

  /**
   * to populate the Municipality by select district id
   * @param districtId
   */
  populateMunicipality(districtId: NgModel) {
    this.municipalityArr = this.municipalityArrData
      .filter(m => m.district_id === districtId);
  }

  /**
   * Saving Capacity Building
   * 
   * @param capacity 
   */
  addCapacity(capacity: NgForm) {
    if (!capacity.valid) {
      const alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Please complete your capacity building form',
        buttons: ['OK']
      });
      alert.present();
      // exit the method when the condition are true
      return;
    }
    this.entityProvider.saveCapacityBuilding(capacity.value).subscribe(res => {
      if (typeof (res) != 'undefined') {
        const alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Capacity Building Saved',
          buttons: ['OK']
        });
        alert.present();
        capacity.resetForm();
      }
      else {
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Capacity Builing was not saved!',
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
  displayCsoList() {
    this.entityProvider.getCso().subscribe(res => {
      if (res) {
        this.DisplayCso = res.results
        this.storeNames();
        for (var x = 0; x < this.DisplayCso.length; x++) {
          this.storeOrgNames(this.DisplayCso[x].cso_name)

        }
      }
    })
  }


  CsoName = new Array();
  storeOrgNames(cso_name) {
    this.CsoName.push(cso_name);
  }

  getCsoName() {
    return this.CsoName

  }


  /**
   * 
   * @param ev 
   * 
   */
  getItems(ev: any) {
    const val = ev.target.value;

    if (val === '') {
      this.items = [];
      return;
    }
    this.items = this.csoProvider.listOfCso.filter((x) => {
      return (x.cso_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }

  initializeItems() {
    this.items = []
    this.items = this.namesArr
  }
  namesArr = new Array()
  storeNames() {
    this.namesArr = this.CsoName;
  }

  // ** find cso id by using name

  /**
   * 
   * @param name 
   * @param capacity 
   */
  openMarkerInfo(name, capacity: NgForm) {
    this.authForm.controls['cso_name'].setValue(name.cso_name);
    this.items = []
  }

}
