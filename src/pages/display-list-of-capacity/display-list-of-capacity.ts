import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AddCapacityPage} from '../add-capacity/add-capacity';
import {LandingPage} from '../landing/landing';
import {EntityProvider} from '../../providers/entity/cso';
import {LoadingController} from 'ionic-angular';
import {CapacityBuilding} from "../../model/capacitybuilding.model";
import {Storage} from "@ionic/storage";
import {ViewCapacityBuildingPage} from "../view-capacity-building/view-capacity-building";



@IonicPage()
@Component({
  selector: 'page-display-list-of-capacity',
  templateUrl: 'display-list-of-capacity.html',
})
export class DisplayListOfCapacityPage implements OnInit {

  originalListOfCapacityBuilding: CapacityBuilding[] = [];
  filteredListOfCapacityBuilding: CapacityBuilding[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: EntityProvider,
    public loadingCtrl: LoadingController,
    public storage: Storage
  ) {
  }

  ngOnInit() {
    this._getListOfCapacityBuilding();
  }

  goBackToHomePage() {
    this.navCtrl.push(LandingPage)
  }

  _getListOfCapacityBuilding() {
    const _loader = this.loadingCtrl.create({
      content: "Please wait information is still loading...",
      duration: 300000000
    });

    _loader.present();

    this.api.getCapacityBuilding().subscribe(_response => {
      if (_response) {
        this.originalListOfCapacityBuilding = _response.capacity_buildings;
        this.filteredListOfCapacityBuilding = _response.capacity_buildings;
      }
      _loader.dismiss();
    })
  }

  viewCapacityBuildingDetail(_capacity_building: CapacityBuilding) {
    this.storage.set('current_capacity_building',_capacity_building);
    this.navCtrl.push(ViewCapacityBuildingPage);

  }

  addCapacityBuilding(){
    this.navCtrl.push(AddCapacityPage);
  }

  searchForCapacityBuildingByVenue(element: any) {
    const _needle = element.target.value;
    if (_needle === '') {
      this.filteredListOfCapacityBuilding = this.originalListOfCapacityBuilding;
      return;
    }
    this.filteredListOfCapacityBuilding = this.originalListOfCapacityBuilding.filter((capacity_building) => {
      return (capacity_building.municipality.title.toLowerCase().indexOf(_needle.toLowerCase()) > -1);
    })
  }

}
