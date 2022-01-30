import { TranslateModule } from "@ngx-translate/core";
import { NbWindowModule, NbDialogModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgSelectModule } from "@ng-select/ng-select";
import { ThemeModule } from "../../@theme/theme.module";
import { CommonModule } from "@angular/common";
import { VenteComponent } from "./vente.component";
import { NgModule } from "@angular/core";

import { ContratClientModule } from "./contrat-client/contrat-client.module";
import { DemandePrixClientModule } from "./demande-prix-client/demande-prix-client.module";
import { DemandeProductionModule } from "./demande-production/demande-production.module";
import { DevisClientModule } from "./devis-client/devis-client.module";
import { FactureModule } from "./facture/facture.module";
import { TarifsDeVenteModule } from "./tarifs-de-vente/tarifs-de-vente.module";
import { EvaluationClientModule } from "./evaluation-client/evaluation-client.module";
import { VenteRoutingModule } from "./vente-routing.module";
import { SelectModule } from "./select/select.module";
import { SuividePaiementComponent } from './suivide-paiement/suivide-paiement.component';
import { FactureAvoirComponent } from './facture-avoir/facture-avoir.component';
import { FactureAvoirModule } from "./facture-avoir/facture-avoir.module";
import { SuividePaiementModule } from "./suivide-paiement/suivide-paiement.module";
import { ContratModule } from "./contrat/contrat.module";
import { BonDeLivraisonModule } from "./bon-de-livraison/bon-de-livraison.module";
import { DashbordVenteComponent } from './dashbord-vente/dashbord-vente.component';
import { DashbordVenteModule } from "./dashbord-vente/dashbord-vente.module";
import { ModalDemandePrixClientComponent } from "./demande-prix-client/modal-demande-prix-client/modal-demande-prix-client.component";
import { ModalContratClientComponent } from "./contrat-client/modal-contrat-client/modal-contrat-client.component";

import { NgxCurrencyModule } from "ngx-currency";
import { CommandeModule } from "./commande/commande.module";





@NgModule({
  declarations: [
    VenteComponent,
    DashbordVenteComponent,





  ],
  imports: [
    CommonModule,
    ThemeModule,
    NgSelectModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    TranslateModule,
    VenteRoutingModule,
    SuividePaiementModule,
    ContratClientModule,
    DemandePrixClientModule,
    DemandeProductionModule,
    DevisClientModule,
    EvaluationClientModule,
    FactureModule,
    FactureAvoirModule,
    BonDeLivraisonModule,
    SelectModule,
    TarifsDeVenteModule,
    ContratModule,
    DashbordVenteModule,
    NgxCurrencyModule,
    CommandeModule

  ],
  exports: [
    TranslateModule,
  ],
  entryComponents: [


  ],
})
export class VenteModule { }