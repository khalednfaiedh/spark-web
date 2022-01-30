import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { Login1Component } from './login1/login1.component';
import { NbDatepickerModule, NbSpinnerModule, NbToastrModule } from '@nebular/theme';
import { AppService } from './login1/app.service';
import { LogoutComponent } from './logout/logout.component';
import localeFr from '@angular/common/locales/fr';
import locale from '@angular/common/locales/ar-TN';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ModalDemandePrixClientComponent } from './pages/vente/demande-prix-client/modal-demande-prix-client/modal-demande-prix-client.component';
import { NgSelectModule } from '@ng-select/ng-select';

import { TransformNumberPipe } from './pages/spark-comptabilite/pipe/transform-number.pipe';
 

import { NgxMaskModule, IConfig } from 'ngx-mask'

registerLocaleData(localeFr);
registerLocaleData(locale);

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
  declarations:
    [AppComponent,
      LoginComponent,
      Login1Component,
      LogoutComponent,
      TransformNumberPipe
   ],

      entryComponents:
       [],
  exports: [LoginComponent,
    TransformNumberPipe
  ],
  imports: [
    NgSelectModule,
    NbSpinnerModule,
    BrowserModule,
    BrowserAnimationsModule,
    NbToastrModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
  
   
    }),
    NgxMaskModule.forRoot(options)

    // NbSecurityModule.forRoot({
    //   accessControl: {
    //     Headers:{
    //       'Content-Type': 'application/json' , 'Accept': 'application/json' , 'Access-Control-Allow-Origin': '*'
    //     },
    //     guest: {
    //       view: ['news', 'comments'],
    //     },
    //     user: {
    //       parent: 'guest',
    //       create: 'comments',
    //     },
    //     moderator: {
    //       parent: 'user',
    //       create: 'news',
    //       remove: '*',
    //     },
    //   },
    // }),
    // NbAuthModule.forRoot({
    //   forms: {
    //     login: {
    //       strategy: 'password',
    //       redirectDelay: 1000,
    //     },
    //   },
    //   strategies: [
    //     NbDummyAuthStrategy.setup({
    //       name: 'dummy',
    //       alwaysFail: true,
    //       delay: 1000,
    //     }),
    //     // NbAuthStrategy({

    //     // }),
    //     NbPasswordAuthStrategy.setup({
    //       name: 'email',
    //       token: {
    //         class: NbAuthJWTToken,
    //       },
    //       login: {
    //         method: 'post',
    //         requireValidToken: false,
    //       },
    //       logout: {
    //         redirect: {
    //           success: '/auth/login',
    //           failure: '/auth/login',
    //         },
    //       },
    //       requestPass: {
    //         redirect: {
    //           success: '/auth/reset-password',
    //         },
    //       },
    //       resetPass: {
    //         redirect: {
    //           success: '/auth/login',
    //         },
    //       },
    //       errors: {
    //         key: 'data.errors',
    //       },
    //     }),
    //     NbOAuth2AuthStrategy.setup({
    //       name: 'password',
    //       clientId: 'OAuth2WebUser',
    //       clientSecret: 'secret',
    //       clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,
    //       baseEndpoint: 'http://localhost:8433/uaa',
    //       token: {
    //         endpoint: '/oauth/token',
    //         grantType: NbOAuth2GrantType.PASSWORD,
    //         class: NbAuthOAuth2Token,
    //       },
    //       refresh: {
    //         endpoint: 'refresh-token',
    //         grantType: NbOAuth2GrantType.REFRESH_TOKEN,
    //       },
    //     }),
    //   ],
    // }),
  ],
  bootstrap: [AppComponent],
  providers: [
    AppService,
    { provide: APP_BASE_HREF, useValue: '/' },
    TranslateService,
  ],
})
export class AppModule { }
