import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LookUpService } from '../../providers/lookup/lookups.service';
import {CapacityBuildingPayload} from "../../model/payload/capacity-building-payload.model";
import {DisplayListOfCapacityPage} from "../display-list-of-capacity/display-list-of-capacity";
import {LandingPage} from "../landing/landing";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";
import {CapacityBuildingService} from "../../service/capacity-building.service";
import {UserService} from "../../service/user.service";
import { ToastController } from 'ionic-angular';
import { NewLookUpService} from "../../service/NewLookUp.service";
@IonicPage()
@Component({
  selector: 'page-add-capacity',
  templateUrl: 'add-capacity.html',
})

export class AddCapacityPage implements OnInit{

  listLookupProvince = [];
  listLookupPartnerType = [];
  listLookupFundingSource = [];
  listLookupCapacityBuildingType = [];
  listLookupMobilizationMethod = [];

  listOriginalLookupDistrict = [];
  listFilteredLookupDistrict = [];
  listOriginalLookupMunicipality = [];
  listFilteredLookupMunicipality = [];

  listOriginalLookupPartner = [];
  listFilteredLookupPartner = [];

  disableDistrictDropdown = true;
  disableMunicipalityDropdown = true;
  disablePartnerDropdown = true;
  capacityBuildingPayload: CapacityBuildingPayload;
  private capacityBuildingForm: FormGroup;

  _districtGuid;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public lookupService: LookUpService,
    public capacityBuildingService: CapacityBuildingService,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    public userService: UserService,
    public toastCtrl: ToastController,
    public LookUp:NewLookUpService,
  ) {}

  ngOnInit(): void {
    this._getCapacityBuildingType();
    this._getPartnerType();
    this._getPartner();
    // this._getDistrict(this.userService.province_guid);
    this._getFundingSource();
    this._getMunicipality();
    this._getProvince();
    this._buildForm();
    this._getNewLookDistrict();
  }

  _buildForm(){
    this.capacityBuildingForm = this.formBuilder.group({
      'facilitator_name': ['', [
        Validators.required, Validators.minLength(2), Validators.maxLength(50),
      ]],
      'venue': ['', [
        Validators.required, Validators.minLength(2), Validators.maxLength(50),]],
      'co_facilitator_name': ['', [Validators.minLength(2), Validators.maxLength(50),]],
      'district': ['', [Validators.required]],
      'municipality': ['', [Validators.required]],
      'funding_source': ['', [Validators.required]],
      'capacity_building_type': ['', [Validators.required]],
      'partner': ['', [Validators.required]],
      'partner_type': ['', [Validators.required]],
      'start_date': ['', [Validators.required,Validators]],
      'end_date': ['', [Validators.required,Validators]],
    });
  }

  _getCapacityBuildingType(){
    this.lookupService.getCapacityBuildingType()
      .subscribe( res =>{
        this.listLookupCapacityBuildingType = res;
      });
  }

  _getPartnerType(){
    this.lookupService.getPartnerType()
      .subscribe( res =>{
        this.listLookupPartnerType = res;
      });
  }

  _getFundingSource() {
    this.lookupService.getFundingSource().subscribe(res => {
      this.listLookupFundingSource = res;
    })
  }

  _getProvince() {
    this.lookupService.getProvince().subscribe(res => {
      this.listLookupProvince = res;
    })
  }

  _getPartner() {
    this.lookupService.getPartner().subscribe(res => {
      this.listOriginalLookupPartner = res;
      this.listFilteredLookupPartner = res;
    })
  }
   _getNewLookDistrict(){
    this.LookUp.getDistrictNew().subscribe((_responseDistrict :any)=>{
      console.log(_responseDistrict)
      this.listFilteredLookupDistrict = _responseDistrict
    })
   }

  _getDistrict(province_guid: string) {
    this.lookupService.getDistrict().subscribe(res => {
      const listOfDistricts = res;
      this.listOriginalLookupDistrict = listOfDistricts.filter(x => x.province_guid === province_guid);
      this.listFilteredLookupDistrict = listOfDistricts.filter(x => x.province_guid === province_guid);
    })
  }

  _getMunicipality() {
    this.lookupService.getLocalMunicipality().subscribe(res => {
      this.listOriginalLookupMunicipality = res;
      this.listFilteredLookupMunicipality = res;
    })
  }

  onchangeDistrict() {
    this._districtGuid = this.capacityBuildingForm.value.district;
      console.log(this._districtGuid)
      this.disableMunicipalityDropdown = false;
      this._getNewLookMunicipality();
    }
  
  _getNewLookMunicipality(){
    console.log(this._districtGuid)
    this.LookUp.getMunicipalitynew(this._districtGuid).subscribe((_responseMunicipality:any)=>{
      console.log(_responseMunicipality)
      this.listFilteredLookupMunicipality =_responseMunicipality
    })
  }

  _updatePartner(_partner_type_guid: string) {
    this.listFilteredLookupPartner = this.listOriginalLookupPartner.filter(x => x.partner_type_guid === _partner_type_guid);
  }

  _updateDistrict(_province_guid: string) {
    this.listFilteredLookupDistrict = this.listOriginalLookupDistrict.filter(x => x.province_guid === _province_guid);
  }

  _updateMunicipality(_district_guid: string) {
    this.listFilteredLookupMunicipality = this.listOriginalLookupMunicipality.filter(x => x.district_guid === _district_guid);

  }

  onchangePartnerType(){
    const _partnerTypeGuid = this.capacityBuildingForm.get('partner_type').value;
    this.disablePartnerDropdown = false;
    this._updatePartner(_partnerTypeGuid);
  }

  onchangeProvince(){
    const _provinceGuid = this.capacityBuildingForm.get('province').value;
    this.disableDistrictDropdown = false;
    this.disableMunicipalityDropdown = true;
    this._updateDistrict(_provinceGuid);
  }

  // onchangeDistrict(){
  //   const _districtGuid = this.capacityBuildingForm.get('district').value;
  //   this.disableMunicipalityDropdown = false;
  //   this._updateMunicipality(_districtGuid);
  // }

  _isInvalidControl(name: string) {
    return this.capacityBuildingForm.get(name).invalid && this.capacityBuildingForm.get(name).dirty;
  }

  redirectToCapacityBuildingList(){
    this.navCtrl.push(DisplayListOfCapacityPage)
  }

  formSubmit(){
    this.capacityBuildingPayload = new CapacityBuildingPayload();
    this.capacityBuildingPayload.municipality_id = this.capacityBuildingForm.value.municipality;
    this.capacityBuildingPayload.capacity_building_type_id = this.capacityBuildingForm.value.capacity_building_type;
    this.capacityBuildingPayload.funding_source_id = this.capacityBuildingForm.value.funding_source;
    this.capacityBuildingPayload.facilitator_name = this.capacityBuildingForm.value.facilitator_name;
    this.capacityBuildingPayload.co_facilitator_name = this.capacityBuildingForm.value.co_facilitator_name;
    this.capacityBuildingPayload.partner_id = this.capacityBuildingForm.value.partner;
    this.capacityBuildingPayload.venue = this.capacityBuildingForm.value.venue;
    this.capacityBuildingPayload.start_date = this.capacityBuildingForm.value.start_date;
    this.capacityBuildingPayload.end_date = this.capacityBuildingForm.value.end_date;

    const _loader = this.loadingCtrl.create({
      content: "Please wait whilst we create capacity...",
      duration: 300000000
    });
    _loader.present();
    this.capacityBuildingService.createCapacityBuilding(this.capacityBuildingPayload).subscribe((_response: any) =>{
      _loader.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Event was added successfully',
        duration: 3000
      });
      toast.present();
      return this.redirectToCapacityBuildingList();
    }, _error => {
      _loader.dismiss();
      if (_error.status === 400) {
        const alert = this.alertCtrl.create({
          title: 'Oops',
          subTitle: 'You have entered invalid details, please check your form inputs.',
          buttons: ['OK']
        });
        alert.present();
      } else {
        const alert = this.alertCtrl.create({
          title: 'Oops',
          subTitle: 'Something went wrong, please contact administrator.',
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }

  goBackToHomePage() {
    this.navCtrl.push(LandingPage)
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: 'Logout',
      message: 'You are about to logout, do you want to proceed?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.storage.remove('authUser').then(removed => {
              this.navCtrl.push(LoginPage);
            });
          }
        }
      ]
    });
    alert.present();
  }
}
