import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NgModel, NgForm,Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LookUpService } from '../../providers/lookup/lookups.service';
import { CapacityBuilding } from '../../model/capacitybuilding.model';
import { EntityProvider } from '../../providers/entity/cso';
import { DataProvider } from '../../providers/dataproviders/dataprovider';
import {CSoResponseData, DisplayListOfCsoPage} from "../display-list-of-cso/display-list-of-cso";
import {CapacityBuildingPayload} from "../../model/payload/capacitybuildingpayload.model";
import {DisplayListOfCapacityPage} from "../display-list-of-capacity/display-list-of-capacity";
import {LandingPage} from "../landing/landing";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";
import {CsoService} from "../../service/cso.service";
import {Cso} from "../../model/cso.model";
import {CapacityBuildingService} from "../../service/capacity-building.service";

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

  originalListOfCsoes: Cso[] = [];
  filteredListOfCsoes: Cso[] = [];

  showCsoList = true;
  cso_guid: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public lookupService: LookUpService,
    public capacityBuildingService: CapacityBuildingService,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    public csoService: CsoService,
  ) {}

  ngOnInit(): void {
    this._getCapacityBuildingType();
    this._getPartnerType();
    this._getPartner();
    this._getDistrict();
    this._getFundingSource();
    this._getMunicipality();
    this._getProvince();
    this._buildForm();
    this._getListOfCsoes();
  }

  _buildForm(){
    this.capacityBuildingForm = this.formBuilder.group({
      'facilitator_name': ['', [
        Validators.required, Validators.minLength(2), Validators.maxLength(50),
      ]],
      'venue': ['', [
        Validators.required, Validators.minLength(2), Validators.maxLength(50),]],
      'co_facilitator_name': ['', [Validators.minLength(2), Validators.maxLength(50),]],
      'province': ['', [Validators.required]],
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

  _getDistrict() {
    this.lookupService.getDistrict().subscribe(res => {
      this.listOriginalLookupDistrict = res;
      this.listFilteredLookupDistrict = res;
    })
  }

  _getMunicipality() {
    this.lookupService.getLocalMunicipality().subscribe(res => {
      this.listOriginalLookupMunicipality = res;
      this.listFilteredLookupMunicipality = res;
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

  onchangeDistrict(){
    const _districtGuid = this.capacityBuildingForm.get('district').value;
    this.disableMunicipalityDropdown = false;
    this._updateMunicipality(_districtGuid);
  }

  _isInvalidControl(name: string) {
    return this.capacityBuildingForm.get(name).invalid && this.capacityBuildingForm.get(name).dirty;
  }

  redirectToCapacityBuildingList(){
    this.navCtrl.push(DisplayListOfCapacityPage)
  }

  formSubmit(){
    this.capacityBuildingPayload = new CapacityBuildingPayload();
    this.capacityBuildingPayload.municipality_guid = this.capacityBuildingForm.value.municipality;
    this.capacityBuildingPayload.capacity_building_type_guid = this.capacityBuildingForm.value.capacity_building_type;
    this.capacityBuildingPayload.funding_source_guid = this.capacityBuildingForm.value.funding_source;
    this.capacityBuildingPayload.facilitator_name = this.capacityBuildingForm.value.facilitator_name;
    this.capacityBuildingPayload.co_facilitator_name = this.capacityBuildingForm.value.co_facilitator_name;
    this.capacityBuildingPayload.partner_guid = this.capacityBuildingForm.value.partner;
    this.capacityBuildingPayload.venue = this.capacityBuildingForm.value.venue;
    this.capacityBuildingPayload.start_date = this.capacityBuildingForm.value.start_date;
    this.capacityBuildingPayload.end_date = this.capacityBuildingForm.value.end_date;
    this.capacityBuildingPayload.cso_guid = this.cso_guid;

    const _loader = this.loadingCtrl.create({
      content: "Please wait whilst we create capacity...",
      duration: 300000000
    });
    _loader.present();
    this.capacityBuildingService.create(this.capacityBuildingPayload).subscribe((_response: any) =>{
      _loader.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Event was added successfully.',
        buttons: ['OK']
      });
      alert.present();
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

  _getListOfCsoes() {

    const _loader = this.loadingCtrl.create({
      content: "Please wait information is still loading...",
      duration: 300000000
    });

    _loader.present();

    this.csoService.list().subscribe((_responseData:CSoResponseData) => {
      this.originalListOfCsoes = _responseData.csoes;
      this.filteredListOfCsoes = _responseData.csoes;
      _loader.dismiss();
    },_error => {
      _loader.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Something went wrong, please contact administrator.',
        buttons: ['OK']
      });
      alert.present();
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

  selectCSO(cso:Cso){
    this.cso_guid = cso.guid;
    this.showCsoList = false;
  }

  searchForCso(element: any) {
    const _needle = element.target.value;
    if (_needle === '') {
      this.filteredListOfCsoes = this.originalListOfCsoes;
      return;
    }
    this.filteredListOfCsoes = this.originalListOfCsoes.filter((cso) => {
      return (cso.name_of_cso.toLowerCase().indexOf(_needle.toLowerCase()) > -1);
    })
  }

}
