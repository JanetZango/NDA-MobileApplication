import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RegistercsoPage} from '../registercso/registercso';
import {EntityProvider} from '../../providers/entity/cso'
import {ViewCsoDetailsPage} from '../view-cso-details/view-cso-details';
import {LoadingController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-display-list-of-cso',
  templateUrl: 'display-list-of-cso.html',
})
export class DisplayListOfCsoPage implements OnInit {

  originalListOfCsoes = [];
  listOfCsoes = []

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

    const loader = this.loadingCtrl.create({
      content: "Please wait information is still loading...",
      duration: 300000000
    });

    loader.present();

    this.api.getCso().subscribe(response => {
      if (response) {
        this.originalListOfCsoes = response.csoes;
        this.listOfCsoes = response.csoes;
      }
      loader.dismiss();
    })
  }

  viewCsoDetail(cso) {
    this.navCtrl.push(ViewCsoDetailsPage, {cso_guid: cso.guid});
  }

  searchForCso(element: any) {
    const niddle = element.target.value;

    if (niddle === '') {
      this.listOfCsoes = this.originalListOfCsoes;
      return;
    }

    this.listOfCsoes = this.originalListOfCsoes.filter((x) => {
      return (x.name_of_cso.toLowerCase().indexOf(niddle.toLowerCase()) > -1);
    })
  }
}
