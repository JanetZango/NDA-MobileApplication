import {Component, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {EntityProvider} from '../../providers/entity/cso'
import {ViewCsoDetailsPage} from '../view-cso-details/view-cso-details';
import {LoadingController} from 'ionic-angular';
import {Cso} from "../../model/cso.model";
import {LandingPage} from "../landing/landing";
import {AddCsoPage} from "../add-cso/add-cso";

@IonicPage()
@Component({
  selector: 'page-display-list-of-cso',
  templateUrl: 'display-list-of-cso.html',
})
export class DisplayListOfCsoPage implements OnInit {

  originalListOfCsoes: Cso[] = [];
  filteredListOfCsoes: Cso[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: EntityProvider,
    public loadingCtrl: LoadingController,
    public storage: Storage
  ) {
  }

  registerCSO() {
    this.navCtrl.push(AddCsoPage)
  }


  ngOnInit() {
    this._getListOfCsoes();
  }

  _getListOfCsoes() {

      const _loader = this.loadingCtrl.create({
        content: "Please wait information is still loading...",
        duration: 300000000
      });

      _loader.present();

      this.api.getCso().subscribe(response => {
        if (response) {
          this.originalListOfCsoes = response.csoes;
          this.filteredListOfCsoes = response.csoes;
        }
        _loader.dismiss();
      })

  }

  goBackToHomePage(){
    this.navCtrl.push(LandingPage)
  }

  viewCsoDetail(_cso: Cso) {
    this.storage.set('current_cso',_cso);
    this.navCtrl.push(ViewCsoDetailsPage)
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
