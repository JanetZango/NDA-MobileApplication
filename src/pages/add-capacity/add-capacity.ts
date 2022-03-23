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
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@IonicPage()
@Component({
  selector: 'page-add-capacity',
  templateUrl: 'add-capacity.html',
})

export class AddCapacityPage implements OnInit{
  private isOpen: boolean = false
  public db: SQLiteObject;
  sql;
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
  district
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
    public sqlite :SqliteProvider
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
        console.log(res)
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
      console.log(this.listFilteredLookupPartner)
    })
  }
   _getNewLookDistrict(){
    this.LookUp.getDistrictNew().subscribe((_responseDistrict :any)=>{
      console.log(_responseDistrict)
      this.listFilteredLookupDistrict = _responseDistrict
    })
   }
   _getDistrict() {
    this.lookupService.getDistrict().subscribe(res => {
     this.listFilteredLookupDistrict = res;
     console.log(this.listFilteredLookupDistrict)
      // this.listOriginalLookupDistrict = listOfDistricts.filter(x => x.id === province_guid);
      // this.listFilteredLookupDistrict = listOfDistricts.filter(x => x.id === province_guid);

    })
  }

  // _getDistrict(province_guid: string) {
  //   this.lookupService.getDistrict().subscribe(res => {
  //     const listOfDistricts = res;
  //     this.listOriginalLookupDistrict = listOfDistricts.filter(x => x.province_guid === province_guid);
  //     this.listFilteredLookupDistrict = listOfDistricts.filter(x => x.province_guid === province_guid);
  //   })
  // }
  

  _getMunicipality() {
    this.lookupService.getLocalMunicipality().subscribe(res => {
      this.listOriginalLookupMunicipality = res;
      this.listFilteredLookupMunicipality = res;
    })
  }

  onchangeDistrict() {
    this.district = this.capacityBuildingForm.value.district;
    console.log(this.district)
    this.disableMunicipalityDropdown = false;
    this._getNewLookMunicipality();
    this._updateMunicipality(this.district);
    }
  
  _getNewLookMunicipality(){
    console.log(this._districtGuid)
    this.LookUp.getMunicipalitynew(this._districtGuid).subscribe((_responseMunicipality:any)=>{
      console.log(_responseMunicipality)
      this.listFilteredLookupMunicipality =_responseMunicipality
    })
  }

  _updatePartner(_partner_type_guid: string) {
    console.log(_partner_type_guid)
    this._getPartner();
    this.listFilteredLookupPartner = this.listOriginalLookupPartner.filter(x => x.partner_type_guid === _partner_type_guid);
    console.log(this.listFilteredLookupPartner)
  }

  _updateDistrict(_province_guid: string) {
    this.listFilteredLookupDistrict = this.listOriginalLookupDistrict.filter(x => x.province_guid === _province_guid);
  }

  _updateMunicipality(_district_guid: string) {
    this.listFilteredLookupMunicipality = this.listOriginalLookupMunicipality.filter(x => x.district_guid === _district_guid);

  }

  onchangePartnerType(){
    const _partnerTypeGuid = this.capacityBuildingForm.get('partner_type').value;
    console.log(_partnerTypeGuid)
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
    this.SaveCSOoFFline();
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

    // const _loader = this.loadingCtrl.create({
    //   content: "Please wait whilst we create capacity...",
    //   duration: 300000000
    // });
    // _loader.present();
    this.capacityBuildingService.createCapacityBuilding(this.capacityBuildingPayload).subscribe((_response: any) =>{
      // _loader.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Event was added successfully',
        duration: 3000
      });
      toast.present();
      return this.redirectToCapacityBuildingList();
    }, _error => {
      // _loader.dismiss();

    });

    // this.sqlite.SaveCapacity(this.capacityBuildingForm.value.capacity_building_type_id,this.capacityBuildingForm.value.district_id	,
    //   this.capacityBuildingForm.value.municipality_id ,this.capacityBuildingForm.value.partner_id ,this.capacityBuildingForm.value.facilitator_name ,this.capacityBuildingForm.value.venue ,this.capacityBuildingForm.value.start_date ,this.capacityBuildingForm.value.end_date ,
    //   this.capacityBuildingForm.value.co_facilitator_name ,this.capacityBuildingForm.value.funding_source_id ).then(_responseSaveCso => {
    //     _loader.dismiss();
    //     _loader.dismiss();
    //     const toast = this.toastCtrl.create({
    //       message: 'Event was added successfully',
    //       duration: 3000
    //     });
    //     toast.present();
    //     return this.redirectToCapacityBuildingList();
    //   })
  }
  province_id=2
  municipalityID=4
  SaveCSOoFFline(){
    if (!this.isOpen) {
      this.sql = new SQLite();
      this.sql.create({ name: "test10.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
         this.isOpen = true;
            let sql = "INSERT INTO Capacity (capacity_building_type_id, district_id	,municipality_id ,partner_id ,facilitator_name ,venue ,start_date ,end_date , co_facilitator_name ,funding_source_id,province_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
            this.db.executeSql(sql, [this.capacityBuildingForm.value.capacity_building_type,this.capacityBuildingForm.value.district	,
                this.municipalityID ,this.capacityBuildingForm.value.partner ,this.capacityBuildingForm.value.facilitator_name ,this.capacityBuildingForm.value.venue ,this.capacityBuildingForm.value.start_date ,this.capacityBuildingForm.value.end_date ,
                this.capacityBuildingForm.value.co_facilitator_name ,this.capacityBuildingForm.value.funding_source ,this.province_id]).then((data) => {
              console.log(data);
              console.log("INSERTED: " + JSON.stringify(data) + sql);
              const toast = this.toastCtrl.create({
                      message: 'Event was added successfully',
                      duration: 3000
                    });
                    toast.present();
            }, (reject) => {
            // })
        })
    })
  }
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
