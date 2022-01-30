import { AchatComponent } from "./achat.component";
import { Routes, RouterModule } from "@angular/router";
import { BonCommandeComponent } from "./bon-commande/bon-commande.component";
import { RefreshBonCommandeComponent } from "./bon-commande/refresh-bon-commande/refresh-bon-commande.component";
import { ContratFournisseurComponent } from "./contrat-fournisseur/contrat-fournisseur.component";
import { HistoriqueCommandeComponent } from "./bon-commande/historique-commande/historique-commande.component";
import { StatistiqueComponent } from "./statistique/statistique.component";
import { FournisseurOrderComponent } from "./evaluation-fournisseur/fournisseur-order/fournisseur-order.component";
import { SuivieComponent } from "./suivie/suivie.component";
import { NgModule } from "@angular/core";
import { EvaluationPercentageFournisseurComponent } from "./evaluation-fournisseur/evaluation-percentage-fournisseur/evaluation-percentage-fournisseur.component";
import { DemandeAchatComponent } from "./demande-achat/demande-achat.component";
import { DemandePrixAchatComponent } from "./demande-prix-achat/demande-prix-achat.component";
import { DevisAchatComponent } from "./devis-achat/devis-achat.component";
import { RefreshContratFournisseurComponent } from "./contrat-fournisseur/refresh-contrat-fournisseur/refresh-contrat-fournisseur.component";
import { BilanComponent } from "./bilan/bilan.component";
import { RefreshDevisAchatComponent } from "./devis-achat/refresh-devis-achat/refresh-devis-achat.component";
import { BonDeLivraisonAchatComponent } from "./bon-de-livraison-achat/bon-de-livraison-achat.component";
import { DemandePrixComponent } from "./demande-prix/demande-prix.component";

const routes: Routes = [{
    path: '',
    component: AchatComponent,
    children: [
        {
            path: 'bilan',
            component: BilanComponent,
        },
        {
            path: 'bonCommande',
            component: BonCommandeComponent,
        },
        {
            path: 'refreshBonCommande',
            component: RefreshBonCommandeComponent,
        },
        {
            path: 'historiqueCommande',
            component: HistoriqueCommandeComponent,
        },
        {
            path: 'contratFournisseur',
            component: ContratFournisseurComponent,
        },
        {
            path: 'refreshContratFournisseur',
            component: RefreshContratFournisseurComponent,
        },
        {
            path: 'proposition',
            component: DemandeAchatComponent,
        },
        {
            path: 'demande-prix',
            component: DemandePrixComponent,
        },
        {
            path: 'demandePrixAchat',
            component: DemandePrixAchatComponent,
        },
        {
            path: 'devisAchat',
            component: DevisAchatComponent,
        },
        {
            path: 'refreshDevisAchat',
            component: RefreshDevisAchatComponent,
        },
        {
            path: 'evaluationPourcentageFournisseur',
            component: EvaluationPercentageFournisseurComponent,
        },
        {
            path: 'fournisseurOrder',
            component: FournisseurOrderComponent,
        },
        {
            path:"statistique",
            component: StatistiqueComponent,
        },
        {
            path: "suivie",
            component: SuivieComponent,
        },
        {
            path: "bonDeLivraisonAchat",
            component: BonDeLivraisonAchatComponent,
 
        },
 
    ]
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AchatRoutingModule {
}