/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { TranslateService } from '@ngx-translate/core';
import { Authorities } from './authorisation/authorities';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  settings: any;

  //public static  urlServer =  "http://176.31.225.231"
  public static urlServer = "http://localhost"

  constructor(private analytics: AnalyticsService, private translate: TranslateService) {

    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('fr');
    let currentLanguage = window.localStorage.getItem("currentLang");

    if ((currentLanguage != null) && translate.getLangs()
      .includes(currentLanguage.toLowerCase())) {
      translate.use(currentLanguage.toLowerCase());
    }

  }
  ngOnInit(): void {
    this.analytics.trackPageViews();

    console.log(Authorities.getUserInfo())
  }

}
