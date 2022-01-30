import { NbWindowModule, NbDialogModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "../../@theme/theme.module";
import { TranslateModule } from "@ngx-translate/core";
import { NgModule } from "@angular/core";
import { AchatRoutingModule } from "./achat-routing.module";
import { BonCommandeModule } from "./bon-commande/bon-commande.module";
import { DemandePrixAchatModule } from "./demande-prix-achat/demande-prix-achat.module";
import { AchatComponent } from "./achat.component";
import { BilanModule } from "./bilan/bilan.module";
import { DemandeAchatModule } from "./demande-achat/demande-achat.module";
import { ContratFournisseurModule } from "./contrat-fournisseur/contrat-fournisseur.module";
import { DevisAchatModule } from "./devis-achat/devis-achat.module";
import { EvaluationFournisseurModule } from "./evaluation-fournisseur/evaluation-fournisseur.module";
import { SuivieModule } from "./suivie/suivie.module";
import { StatistiqueModule } from "./statistique/statistique.module";
import { BonDeLivraisonAchatModule } from "./bon-de-livraison-achat/bon-de-livraison-achat.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { CommonModule } from "@angular/common";
import { DemandePrixComponent } from './demande-prix/demande-prix.component';
import { ShowDemandePrixComponent } from './demande-prix/show-demande-prix/show-demande-prix.component';

@NgModule({
  declarations: [
    AchatComponent,
    DemandePrixComponent,
    ShowDemandePrixComponent,

  ],
  imports: [
    ThemeModule,
    NgSelectModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    TranslateModule,
    AchatRoutingModule,
    BilanModule,
    BonCommandeModule,
    BonDeLivraisonAchatModule,
    ContratFournisseurModule,
    DemandeAchatModule,
    DemandePrixAchatModule,
    DevisAchatModule,
    EvaluationFournisseurModule,
    StatistiqueModule,
    SuivieModule,
  ],
  exports: [
    TranslateModule,
  ],
  entryComponents: [
  ],
  providers: [

  ],
})
export class AchatModule { }