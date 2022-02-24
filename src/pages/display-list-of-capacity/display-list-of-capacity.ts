import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AddCapacityPage} from '../add-capacity/add-capacity';
import {LandingPage} from '../landing/landing';
import {LoadingController} from 'ionic-angular';
import {CapacityBuilding} from "../../model/capacitybuilding.model";
import {Storage} from "@ionic/storage";
import {ViewCapacityBuildingPage} from "../view-capacity-building/view-capacity-building";
import {CapacityBuildingService} from "../../service/capacity-building.service";
import {LoginPage} from "../login/login";

export interface CapacityBuildingResponseData {
  capacity_buildings: any;
}


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
    public capacityBuildingService: CapacityBuildingService,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
  ) {
  }

  ngOnInit() {
    this._getListOfCapacityBuilding();
  }


  _getListOfCapacityBuilding() {
    const _loader = this.loadingCtrl.create({
      content: "Please wait information is still loading...",
      duration: 300000000
    });

    _loader.present();

    this.capacityBuildingService.listofCapacity().subscribe((_response:any) => {
      _loader.dismiss();
      this.originalListOfCapacityBuilding = _response
      this.filteredListOfCapacityBuilding = _response;
      this.filteredListOfCapacityBuilding.reverse();
      console.log(this.filteredListOfCapacityBuilding)
    }, _error => {
      _loader.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Something went wrong, please contact administrator.',
        buttons: ['OK']
      });
      alert.present();
    })
  }

  viewCapacityBuildingDetail(_capacity_building: CapacityBuilding) {
    this.storage.set('current_capacity_building', _capacity_building);
    this.navCtrl.push(ViewCapacityBuildingPage);

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

  addCapacityBuilding() {
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
