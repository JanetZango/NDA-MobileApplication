import {Component} from '@angular/core';

import {  LandingPage } from "../landing/landing";
import { MenuController, NavParams} from "ionic-angular";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LandingPage;
  myIndex: number;

  constructor(navParams: NavParams, public menuCtrl: MenuController) {
    this.myIndex = navParams.data.tabIndex || 0;
    this.menuCtrl.enable(true)
  }
}
