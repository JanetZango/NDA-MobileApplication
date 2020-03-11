import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RegistercsoPage} from '../registercso/registercso';
import {EntityProvider} from '../../providers/entity/cso'
import {ViewCsoDetailsPage} from '../view-cso-details/view-cso-details';
import {LoadingController} from 'ionic-angular';
import {CsoViewModel} from "../../model/view/cso.view.model";

@IonicPage()
@Component({
  selector: 'page-display-list-of-cso',
  templateUrl: 'display-list-of-cso.html',
})
export class DisplayListOfCsoPage implements OnInit {

  originalListOfCsoes: CsoViewModel[] = [];
  listOfCsoes: CsoViewModel[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: EntityProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  registerCSO() {
    this.navCtrl.push(RegistercsoPage)
  }

  gotoLanding() {
    this.navCtrl.pop();
  }

  ngOnInit() {
    this.getListOfCsoes();
  }

  getListOfCsoes() {
    const _loader = this.loadingCtrl.create({
      content: "Please wait information is still loading...",
      duration: 300000000
    });

    _loader.present();

    this.api.getCso().subscribe(response => {
      if (response) {
        this.originalListOfCsoes = response.csoes;
        this.listOfCsoes = response.csoes;
      }
      _loader.dismiss();
    })
  }

  viewCsoDetail(_cso: CsoViewModel) {
    this.navCtrl.push(ViewCsoDetailsPage, {cso:_cso});
  }

  searchForCso(element: any) {
    const _needle = element.target.value;
    if (_needle === '') {
      this.listOfCsoes = this.originalListOfCsoes;
      return;
    }
    this.listOfCsoes = this.originalListOfCsoes.filter((x) => {
      return (x.name_of_cso.toLowerCase().indexOf(_needle.toLowerCase()) > -1);
    })
  }
}
