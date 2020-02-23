import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  capacity: CapacityBuilding = new CapacityBuilding();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public lookupService: LookUpService,
    public entityProvider: EntityProvider,
    public alertCtrl: AlertController,
    public csoProvider: DataProvider
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

  getCapacityBuilding(){
    this.lookupService.getCapacityBuildingType().subscribe(res =>{
      this.capacityArr = res;
    })
  }

  getDistrict(){
    this.lookupService.getDistrict().subscribe(res =>{
      this.districtArr = res;
    })
  }

  getProvince(){
    this.lookupService.getProvince().subscribe(res =>{
      this.provinceArr = res;
    })
  }

  getPartnerType(){
    this.lookupService.getPartnerType().subscribe(res =>{
      this.partnerArr = res;
    })
  }

  getMunicipality(){
    this.lookupService.getLocalMunicipality().subscribe(res =>{
      this.municipalityArr = res;
    })
  }

  addCapacity(capacity: NgForm){
    this.entityProvider.saveCapacityBuilding(capacity.value)
      .subscribe(res =>{
        if(res.status === 201){
          // TODO
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
