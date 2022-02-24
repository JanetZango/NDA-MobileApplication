import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {LookUpService} from '../../providers/lookup/lookups.service';
import {CsoPayload} from "../../model/payload/cso-payload.model";
import {DisplayListOfCsoPage} from "../display-list-of-cso/display-list-of-cso";
import {LandingPage} from "../landing/landing";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";
import {CsoService} from "../../service/cso.service";
import {UserService} from "../../service/user.service";
import { ToastController } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { NewLookUpService} from "../../service/NewLookUp.service";
import { AddCSO } from '../../model/payload/AddCso.model'

@IonicPage()
@Component({
  selector: 'page-add-cso',
  templateUrl: 'add-cso.html',
})
export class AddCsoPage implements OnInit {

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

  _districtGuid;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public lookupService: LookUpService,
    public csoService: CsoService,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    public userService: UserService,
    public LookUp:NewLookUpService,
    public toastCtrl: ToastController,
    public sqlite :SqliteProvider) {
  }

  ngOnInit(): void {
    this._buildForm();
    // this._getCsoType();
    // this._getCsoSector();
    // this._getMobilisationMethod();
    // this._getDistrict(this.userService.province_guid);
    // this._getMunicipality();


    // new
    this._getNewLookType();
    this._getNewLookSector();
    this._getNewLookMobilization();
    this._getNewLookDistrict();
    // this._getNewLookMunicipality();
  }

  _buildForm() {
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
      'email_address': ['', [Validators.required, Validators.email]],
      'contact_number': ['', [
        Validators.required, Validators.minLength(9), Validators.maxLength(15),
      ]],
      'contact_person': ['', [
        Validators.required, Validators.minLength(2), Validators.maxLength(15),
      ]],
      'physical_address': ['', [
        Validators.required, Validators.minLength(2), Validators.maxLength(100),
      ]],
      'district': ['', [Validators.required]],
      'municipality': ['', [Validators.required]],
      'cso_type': ['', [Validators.required]],
      'cso_sector': ['', [Validators.required]],
      'mobilization_method': ['', [Validators.required]],
      'mobilization_date': ['', [Validators.required, Validators]],
      
    });
  }



  _getNewLookType(){
    this.LookUp.getCSOType().subscribe((_responseType:any)=>{
      console.log(_responseType)
      this.listLookupCsoType =_responseType
    })
  }

  _getNewLookSector(){
    this.LookUp.getCSOSector().subscribe((_responseSector:any)=>{
      console.log(_responseSector)
      this.listLookupCsoSector =_responseSector
    })
  }

  
  _getNewLookMobilization(){
    this.LookUp.getGetCSOMobilisationMethod().subscribe((_responseMumicipality:any)=>{
      console.log(_responseMumicipality)
      this.listLookupMobilizationMethod =_responseMumicipality
    })
  }

  _getNewLookDistrict(){
   this.LookUp.getDistrictNew().subscribe((_responseDistrict :any)=>{
     console.log(_responseDistrict)
     this.listFilteredLookupDistrict = _responseDistrict
   })
  }

  onchangeDistrict() {
    this._districtGuid = this.csoForm.value.district;
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

  _getMobilisationMethod() {
    this.lookupService.getMobilisationMethod()
      .subscribe(res => {
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
  _getDistrictLookUp(){
    
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

  _updateDistrict(province_guid: string) {
    this.listFilteredLookupDistrict = this.listOriginalLookupDistrict.filter(x => x.province_guid === province_guid);
  }

  // _updateMunicipality(district_guid: string) {
  //   this.listFilteredLookupMunicipality = this.listOriginalLookupMunicipality.filter(x => x.id === id);

  // }

  onchangeProvince() {
    const _provinceGuid = this.csoForm.get('province').value;
    this.disableDistrictDropdown = false;
    this.disableMunicipalityDropdown = true;
    this._updateDistrict(_provinceGuid);
  }

 
  _isInvalidControl(name: string) {
    return this.csoForm.get(name).invalid && this.csoForm.get(name).dirty;
  }

  redirectToCSOList() {
    this.navCtrl.push(DisplayListOfCsoPage)
  }

  formSubmit() {
    this.csoPayload = new CsoPayload();
    this.csoPayload.name_of_cso = this.csoForm.value.name_of_cso;
    this.csoPayload.cso_type_id = this.csoForm.value.cso_type;
    this.csoPayload.cso_sector_id= this.csoForm.value.cso_sector;
    this.csoPayload.municipality_id = this.csoForm.value.municipality;
    this.csoPayload.physical_address = this.csoForm.value.physical_address;
    this.csoPayload.contact_person = this.csoForm.value.contact_person;
    this.csoPayload.ward_number = this.csoForm.value.ward_number;
    this.csoPayload.total_staff = this.csoForm.value.total_staff;
    this.csoPayload.registration_number = this.csoForm.value.registration_number;
    this.csoPayload.email_address = this.csoForm.value.email_address;
    this.csoPayload.contact_number = this.csoForm.value.contact_number;
    this.csoPayload.cso_mobilisation_method_id = this.csoForm.value.mobilization_method;
    // this.csoPayload.mobilization_date = this.csoForm.value.mobilization_date;
    this.csoPayload.district_id = this.csoForm.value.district

    console.log(this.csoPayload)

    // const _loader = this.loadingCtrl.create({
    //   content: "Please wait whilst we create cso...",
    //   duration: 300000000
    // });

    // _loader.present();

    this.csoService.createCso(this.csoPayload).subscribe((_response: any) => {
      console.log(_response)
      // _loader.dismiss();
      const toast = this.toastCtrl.create({
        message: 'CSO was added successfully',
        duration: 3000
      });
      toast.present();
      // return this.redirectToCSOList();
    // }, _error => {
    //   _loader.dismiss();
    //   if (_error.status === 400) {
    //     const alert = this.alertCtrl.create({
    //       title: 'Oops',
    //       subTitle: 'You have entered invalid details, please check your form inputs.',
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //   } else {
    //     const alert = this.alertCtrl.create({
    //       title: 'Oops',
    //       subTitle: 'Something went wrong, please contact administrator.',
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //   }
    });
    // this.sqlite.SaveCSO(this.csoForm.value.name_of_cso,this.csoForm.value.cso_type,this.csoForm.value.cso_sector,this.csoForm.value.municipality,
    //   this.csoForm.value.physical_address ,this.csoForm.value.contact_person,this.csoForm.value.ward_number ,this.csoForm.value.total_staf,
    //   this.csoForm.value.registration_number,this.csoForm.value.email_address,this.csoForm.value.contact_number,this.csoForm.value.mobilization_method
    //   , this.csoForm.value.district).then(_responseSaveCso =>{
    //     console.log(_responseSaveCso)
    //     const _loader = this.loadingCtrl.create({
    //       content: "Please wait whilst we create cso...",
    //       duration: 300000000
    //     });
    
    //     _loader.present();
    //   })
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
