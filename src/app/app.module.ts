import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from "@angular/common/http";
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LandingPage } from '../pages/landing/landing';
import { DisplayListOfCsoPage } from '../pages/display-list-of-cso/display-list-of-cso';
import { RegistercsoPage } from '../pages/registercso/registercso';
import { DisplayListOfCapacityPage } from '../pages/display-list-of-capacity/display-list-of-capacity';
import { DisplayListOfAssessmentPage } from '../pages/display-list-of-assessment/display-list-of-assessment';
import { AddAssessmentPage } from '../pages/add-assessment/add-assessment';
import { AddCapacityPage } from '../pages/add-capacity/add-capacity';
import { AddOtpPage } from '../pages/add-otp/add-otp';
import { ApiProvider } from '../providers/api/api';
import { LocalstorageProvider } from '../providers/localstorage/localstorage';
import { AsynPage } from '../pages/asyn/asyn';
import { ConfigService } from '../providers/config/config.server';
import { EntityProvider } from '../providers/entity/cso'
import { ViewcsodetailsPage } from '../pages/viewcsodetails/viewcsodetails';
import { LookUpService } from '../providers/lookup/lookups.service';
import { DataProvider } from '../providers/dataproviders/dataprovider';
import { ViewCsoMemberPage } from '../pages/view-cso-member/view-cso-member';
import { DisplayCsoMemberListPage } from '../pages/display-cso-member-list/display-cso-member-list';
import { AddCsoMemberPage } from '../pages/add-cso-member/add-cso-member';
import { httpInterceptorProviders } from '../providers/api';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    LandingPage,
    DisplayListOfCsoPage,
    RegistercsoPage,
    DisplayListOfAssessmentPage,
    DisplayListOfCapacityPage,
    AddAssessmentPage,
    AddCapacityPage,
    AddOtpPage,
    AsynPage,
    ViewcsodetailsPage,
    ViewCsoMemberPage,
    DisplayCsoMemberListPage,
    AddCsoMemberPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    LandingPage,
    DisplayListOfCsoPage,
    RegistercsoPage,
    AddOtpPage,
    AddCapacityPage,
    DisplayListOfAssessmentPage,
    DisplayListOfCapacityPage,
    AddAssessmentPage,
    AsynPage,
    ViewcsodetailsPage,
    ViewCsoMemberPage,
    DisplayCsoMemberListPage,
    AddCsoMemberPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    EntityProvider,
    ConfigService,
    LookUpService,
    DataProvider,
    httpInterceptorProviders
    

  ]
})
export class AppModule {}
