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
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { SyncService } from '../../service/Sync.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



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
  private isOpen: boolean = false
  public db: SQLiteObject;
  sql;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public csoService: CsoService,
    public alertCtrl: AlertController,
    public LookUp: NewLookUpService,
    public sqlite :SqliteProvider,
    public sync:SyncService
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

  getSector;
  Lookup;
  _getListOfCsoes() {
    this.csoService.getListOfCSO().subscribe((_responseCso: any) => {
      console.log(_responseCso)
      // _loader.dismiss();
      this.filteredListOfCsoes = _responseCso
      this.originalListOfCsoes = _responseCso

    })
    this.SyncMethod();
  }

  SyncMethod(){
    this.sqlite.getCso().then((_responseCso:any)=>{
      // _loader.dismiss();
      console.log(_responseCso)
      this.filteredListOfCsoes = _responseCso
      this.originalListOfCsoes = _responseCso
      console.log(_responseCso)

      this.sync.SyncRegisteredCSO(_responseCso).subscribe(data =>{
        console.log(data)
        this.DeleteLocalCSO()
      })
    })
  }

  DeleteLocalCSO(){
      if (!this.isOpen) {
        this.sql = new SQLite();
        this.sql.create({ name: "test10.db", location: "default" }).then((db: SQLiteObject) => {
          this.db = db;
          this.db = db;
          db.executeSql('DELETE FROM CSO', [])
          console.log("Tables Deleted")
  
        }).catch((error) => {
          console.log(error);
        }); 
  
      }
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
