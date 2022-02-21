import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicStorageModule} from '@ionic/storage';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {LandingPage} from '../pages/landing/landing';
import {DisplayListOfCsoPage} from '../pages/display-list-of-cso/display-list-of-cso';
import {AddCsoPage} from '../pages/add-cso/add-cso';
import {DisplayListOfCapacityPage} from '../pages/display-list-of-capacity/display-list-of-capacity';
import {DisplayListOfAssessmentPage} from '../pages/display-list-of-assessment/display-list-of-assessment';
import {AddAssessmentPage} from '../pages/add-assessment/add-assessment';
import {AddCapacityPage} from '../pages/add-capacity/add-capacity';
import {AddOtpPage} from '../pages/add-otp/add-otp';
import {ViewCsoDetailsPage} from '../pages/view-cso-details/view-cso-details';
import {ViewAssessmentPage} from '../pages/view-assessment/view-assessment';
import {ViewCapacityBuildingPage} from '../pages/view-capacity-building/view-capacity-building';
import {LookUpService} from '../providers/lookup/lookups.service';
import {ViewCsoMemberPage} from '../pages/view-cso-member/view-cso-member';
import {DisplayCsoMemberListPage} from '../pages/display-cso-member-list/display-cso-member-list';
import {AddCsoMemberPage} from '../pages/add-cso-member/add-cso-member';
import {AuthInterceptorService} from "../service/auth-interceptor.service";
import { SqliteProvider } from '../providers/sqlite/sqlite';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    LandingPage,
    DisplayListOfCsoPage,
    AddCsoPage,
    DisplayListOfAssessmentPage,
    DisplayListOfCapacityPage,
    AddAssessmentPage,
    AddCapacityPage,
    AddOtpPage,
    ViewCsoDetailsPage,
    ViewCsoMemberPage,
    DisplayCsoMemberListPage,
    AddCsoMemberPage,
    ViewAssessmentPage,
    ViewCapacityBuildingPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    LandingPage,
    DisplayListOfCsoPage,
    AddCsoPage,
    AddOtpPage,
    AddCapacityPage,
    DisplayListOfAssessmentPage,
    DisplayListOfCapacityPage,
    AddAssessmentPage,
    ViewCsoDetailsPage,
    ViewCsoMemberPage,
    DisplayCsoMemberListPage,
    AddCsoMemberPage,
    ViewAssessmentPage,
    ViewCapacityBuildingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LookUpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    SqliteProvider

  ]
})
export class AppModule {
}
