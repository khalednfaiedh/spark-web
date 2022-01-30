import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { ThemeModule } from '../../../@theme/theme.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { DashbordVenteComponent } from './dashbord-vente.component';
import { AnalysePaiementComponent } from './analyse-paiement/analyse-paiement.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AnalyseBonDeLivraisonComponent } from './analyse-bon-de-livraison/analyse-bon-de-livraison.component';
import { AnalyseBonDeLivraisonFactureComponent } from './analyse-bon-de-livraison/analyse-bon-de-livraiosn-facture';
import { NgSelectOption } from '@angular/forms';
import { NbSelectModule } from '@nebular/theme';
import { AnalyseDevisComponent } from './analyse-devis/analyse-devis.component';


@NgModule({
  declarations: [AnalysePaiementComponent, AnalyseBonDeLivraisonComponent, AnalyseBonDeLivraisonFactureComponent, AnalyseDevisComponent],
  exports: [AnalysePaiementComponent, AnalyseBonDeLivraisonComponent, AnalyseBonDeLivraisonFactureComponent, AnalyseDevisComponent],
  imports: [
    CommonModule,
    ThemeModule,
    NgxEchartsModule, NgxChartsModule, ChartModule, LeafletModule,
    NgSelectModule,
    NbSelectModule,

  ],
  entryComponents: []
})
export class DashbordVenteModule { }
