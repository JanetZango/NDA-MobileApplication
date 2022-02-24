import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewCsoDetailsPage } from '../view-cso-details/view-cso-details';
import { LoadingController } from 'ionic-angular';
import { Cso } from "../../model/cso.model";
import { LandingPage } from "../landing/landing";
import { AddCsoPage } from "../add-cso/add-cso";
import { CsoService } from "../../service/cso.service";
import { LoginPage } from "../login/login";
import { NewLookUpService } from "../../service/NewLookUp.service";

export interface CSoResponseData {
  csoes: any;
}


@IonicPage()
@Component({
  selector: 'page-display-list-of-cso',
  templateUrl: 'display-list-of-cso.html',
})
export class DisplayListOfCsoPage implements OnInit {

  originalListOfCsoes: Cso[] = [];
  filteredListOfCsoes: Cso[] = [];
  listLookupCsoType = [];
  listLookupCsoSector = [];
  listLookupMobilizationMethod = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public csoService: CsoService,
    public alertCtrl: AlertController,
    public LookUp: NewLookUpService,
  ) { }

  registerCSO() {
    this.navCtrl.push(AddCsoPage)
  }


  ngOnInit() {
    this._getListOfCsoes();
    this._getNewLookType();
    this._getNewLookSector();
    this._getNewLookMobilization()
  }


  _getNewLookType() {
    this.LookUp.getCSOType().subscribe((_responseType: any) => {
      console.log(_responseType)
      this.listLookupCsoType = _responseType
    })
  }

  _getNewLookSector() {
    this.LookUp.getCSOSector().subscribe((_responseSector: any) => {
      console.log(_responseSector)
      this.listLookupCsoSector = _responseSector
    })
  }


  _getNewLookMobilization() {
    this.LookUp.getGetCSOMobilisationMethod().subscribe((_responseMumicipality: any) => {
      console.log(_responseMumicipality)
      this.listLookupMobilizationMethod = _responseMumicipality
    })
  }

  _getListOfCsoes() {

    const _loader = this.loadingCtrl.create({
      content: "Please wait information is still loading...",
      duration: 300000000
    });

    _loader.present();

    this.csoService.getListOfCSO().subscribe((_responseCso: any) => {
      console.log(_responseCso)
      _loader.dismiss();
      this.filteredListOfCsoes = _responseCso
      this.originalListOfCsoes =_responseCso
    })

    // this.csoService.list().subscribe((_responseData:CSoResponseData) => {
    //   this.originalListOfCsoes = _responseData.csoes;
    //   this.filteredListOfCsoes = _responseData.csoes;

    // },_error => {
    //   _loader.dismiss();
    //   const alert = this.alertCtrl.create({
    //     title: 'Oops',
    //     subTitle: 'Something went wrong, please contact administrator.',
    //     buttons: ['OK']
    //   });
    //   alert.present();
    // });
  }

  goBackToHomePage() {
    this.navCtrl.push(LandingPage)
  }

  viewCsoDetail(_cso: Cso) {
    this.storage.set('current_cso', _cso);
    this.navCtrl.push(ViewCsoDetailsPage)
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

  searchForCso(element: any) {
    // console.log(element)
    const _needle = element.target.value;
    if (_needle === '') {
      this.filteredListOfCsoes = this.originalListOfCsoes;
      console.log(this.filteredListOfCsoes)
      console.log(this.originalListOfCsoes)
      return;
    }
    this.filteredListOfCsoes = this.originalListOfCsoes.filter((cso) => {
      console.log(cso)
      console.log(this.filteredListOfCsoes)
      console.log(this.originalListOfCsoes)
      return (cso.name_of_cso.toLowerCase().indexOf(_needle.toLowerCase()) > -1);
    })
  }
}
