import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LookUpService } from '../../providers/lookup/lookups.service';
import { EntityProvider } from '../../providers/entity/cso';
import {CsoPayload} from "../../model/payload/csopayload.model";
import {DisplayCsoMemberListPage} from "../display-cso-member-list/display-cso-member-list";
import {DisplayListOfCsoPage} from "../display-list-of-cso/display-list-of-cso";

@IonicPage()
@Component({
  selector: 'page-add-cso',
  templateUrl: 'add-cso.html',
})
export class AddCsoPage implements OnInit{

  listLookupProvince = [];
  listLookupCsoType = [];
  listLookupCsoSector = [];
  listLookupMobilizationMethod = [];

  listOriginalLookupDistrict = [];
  listFilteredLookupDistrict = [];
  listOriginalLookupMunicipality = [];
  listFilteredLookupMunicipality = [];

  disableDistrictDropdown = true;
  disableMunicipalityDropdown = true;

  csoPayload: CsoPayload;
  private csoForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public lookupService: LookUpService,
    public entityProvider: EntityProvider,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder ) {}

  ngOnInit(): void {
    this._buildForm();
    this._getCsoType();
    this._getCsoSector();
    this._getMobilisationMethod();
    this._getProvince();
    this._getDistrict();
    this._getMunicipality();
  }

  _buildForm(){
    this.csoForm = this.formBuilder.group({
      'name_of_cso': ['', [
        Validators.required, Validators.minLength(2), Validators.maxLength(50),
      ]],
      'ward_number': ['', [
        Validators.required, Validators.minLength(1), Validators.maxLength(3),
      ]],
      'total_staff': ['', [
        Validators.required, Validators.minLength(0), Validators.maxLength(5),
      ]],
      'registration_number': ['', [
        Validators.required, Validators.minLength(0), Validators.maxLength(20),
      ]],
      'email_address': ['', [Validators.required,  Validators.email]],
      'contact_number': ['', [
        Validators.required, Validators.minLength(9), Validators.maxLength(15),
      ]],
      'contact_person': ['', [
        Validators.required, Validators.minLength(2), Validators.maxLength(15),
      ]],
      'physical_address': ['', [
        Validators.required, Validators.minLength(2), Validators.maxLength(100),
      ]],
      'province': ['', [Validators.required]],
      'district': ['', [Validators.required]],
      'municipality': ['', [Validators.required]],
      'cso_type': ['', [Validators.required]],
      'cso_sector': ['', [Validators.required]],
      'mobilization_method': ['', [Validators.required]],
      'mobilization_date': ['', [Validators.required,Validators]],
    });
  }

  _getMobilisationMethod(){
    this.lookupService.getMobilisationMethod()
      .subscribe( res =>{
        this.listLookupMobilizationMethod = res;
    });
  }

  _getCsoSector() {
    this.lookupService.getCsoSector().subscribe(res => {
      this.listLookupCsoSector = res;
    })
  }

  _getCsoType() {
    this.lookupService.getCsoType().subscribe(res => {
      this.listLookupCsoType = res;
    })
  }

  _getProvince() {
    this.lookupService.getProvince().subscribe(res => {
      this.listLookupProvince = res;
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

  _updateDistrict(province_guid: string) {
    this.listFilteredLookupDistrict = this.listOriginalLookupDistrict.filter(x => x.province_guid === province_guid);
  }

  _updateMunicipality(district_guid: string) {
    this.listFilteredLookupMunicipality = this.listOriginalLookupMunicipality.filter(x => x.district_guid === district_guid);

  }

  onchangeProvince(){
    const _provinceGuid = this.csoForm.get('province').value;
    this.disableDistrictDropdown = false;
    this.disableMunicipalityDropdown = true;
    this._updateDistrict(_provinceGuid);
  }

  onchangeDistrict(){
    const _districtGuid = this.csoForm.get('district').value;
    this.disableMunicipalityDropdown = false;
    this._updateMunicipality(_districtGuid);
  }

  _isInvalidControl(name: string) {
    return this.csoForm.get(name).invalid && this.csoForm.get(name).dirty;
  }

  redirectToCSOList(){
    this.navCtrl.push(DisplayListOfCsoPage)
  }

  formSubmit(){
    this.csoPayload = new CsoPayload();
    this.csoPayload.name_of_cso = this.csoForm.value.name_of_cso;
    this.csoPayload.cso_type_guid = this.csoForm.value.cso_type;
    this.csoPayload.cso_sector_guid = this.csoForm.value.cso_sector;
    this.csoPayload.municipality_guid = this.csoForm.value.municipality;
    this.csoPayload.physical_address = this.csoForm.value.physical_address;
    this.csoPayload.contact_person = this.csoForm.value.contact_person;
    this.csoPayload.ward_number = this.csoForm.value.ward_number;
    this.csoPayload.total_staff = this.csoForm.value.total_staff;
    this.csoPayload.registration_number = this.csoForm.value.registration_number;
    this.csoPayload.email_address = this.csoForm.value.email_address;
    this.csoPayload.contact_number = this.csoForm.value.contact_number;
    this.csoPayload.mobilization_method_guid = this.csoForm.value.mobilization_method;
    this.csoPayload.mobilization_date = this.csoForm.value.mobilization_date;

    this.entityProvider.saveCso(this.csoPayload).subscribe(_response =>{

      if (_response) {
        const alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'CSO was added successfully.',
          buttons: ['OK']
        });
        alert.present();

      } else {
        const alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'An error occurred, please contact administrator!',
          buttons: ['OK']
        });
        alert.present();
      }
      return this.redirectToCSOList();
    });
  }
}
