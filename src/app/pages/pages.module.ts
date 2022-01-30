import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ParametreModule } from './parametre/parametre.module';
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgSelectModule } from '@ng-select/ng-select';
import { NbSecurityModule } from '@nebular/security';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { AchatModule } from './achat/achat.module';
import { AdminModule } from './admin/admin.module';
import { VenteModule } from './vente/vente.module';
import { StockComponent } from './stock/stock.component';
import { StockModule } from './stock/stock.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NbListModule, NbProgressBarModule, NbWindowModule, NbPopoverModule } from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { NgxEchartsModule } from 'ngx-echarts';
import { FormsModule } from '@angular/forms';
import { ModalDemandePrixClientComponent } from './vente/demande-prix-client/modal-demande-prix-client/modal-demande-prix-client.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { GPAOComponent } from './gpao/gpao.component';
import { FinanceComponent } from './finance/finance.component';
import { SpecialHeaderComponent } from './special-header/special-header.component';
import { TranslateService } from '@ngx-translate/core';
import { NgxCurrencyModule } from 'ngx-currency';
import { ClientModule } from './admin/client/client.module';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [

    NbSecurityModule.forRoot(),
    PagesRoutingModule,
    NgxPermissionsModule.forRoot(),
    ThemeModule,
    ECommerceModule,
    MiscellaneousModule,
    ParametreModule,
    Ng2SmartTableModule,
    // UtilisateurModule,
    DragDropModule,
    NgSelectModule,
    AchatModule,
    AdminModule,
    VenteModule,
    StockModule,
    ClientModule,
    // AchatModule,
    // AdminModule,
    // VenteModule,
    // EmployeModule, // le module rh
    // SparkComptabiliteModule,
    // ParametrageModule,

    FormsModule,
    NbListModule,
    NbProgressBarModule,
    NbWindowModule.forChild(),

    ScrollingModule,
    NbPopoverModule,

    ChartModule,
    NgxEchartsModule,
    NgxChartsModule,


    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgxCurrencyModule




  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ModalDemandePrixClientComponent,

    FinanceComponent,
    SpecialHeaderComponent


  ],
  entryComponents: [
    ModalDemandePrixClientComponent
  ],
  providers: [
    // AuthGuard,
    TranslateService,
  ]
})
export class PagesModule {
}