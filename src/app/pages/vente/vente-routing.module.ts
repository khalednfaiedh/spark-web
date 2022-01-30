import { VenteComponent } from "./vente.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { TarifsDeVenteComponent } from "./tarifs-de-vente/tarifs-de-vente.component";
import { ContratClientComponent } from "./contrat-client/contrat-client.component";
import { RefreshContratClientComponent } from "./contrat-client/refresh-contrat-client/refresh-contrat-client.component";
import { DemandePrixClientComponent } from "./demande-prix-client/demande-prix-client.component";
import { RefreshDemandePrixClientComponent } from "./demande-prix-client/refresh-demande-prix-client/refresh-demande-prix-client.component"
import { DemandeProductionComponent } from "./demande-production/demande-production.component";
import { DevisClientComponent } from "./devis-client/devis-client.component";
import { RefreshDevisClientComponent } from "./devis-client/refresh-devis-client/refresh-devis-client.component";
import { FactureComponent } from "./facture/facture.component";
import { ClientOrderComponent } from "./evaluation-client/client-order/client-order.component";
import { EvaluationPercentageClientComponent } from "./evaluation-client/evaluation-percentage-client/evaluation-percentage-client.component";
import { RefreshFactureComponent } from "./facture/refresh-facture/refresh-facture.component";
import { SelectComponent } from "./select/select.component";

import { ClientEvaluationComponent } from "./evaluation-client/client-evaluation/client-evaluation.component";
import { QuantityProductComponent } from "./quantity-product/quantity-product.component";
import { RefreshTarifsDeVenteComponent } from "./tarifs-de-vente/refresh-tarifs-de-vente/refresh-tarifs-de-vente.component";
import { FactureAvoirComponent } from "./facture-avoir/facture-avoir.component";

import { SuividePaiementComponent } from "./suivide-paiement/suivide-paiement.component";
import { ContratComponent } from "./contrat/contrat.component";
import { BonDeLivraisonComponent } from "./bon-de-livraison/bon-de-livraison.component";
import { RefreshBonDeLivraisonComponent } from "./bon-de-livraison/refresh-bon-de-livraison/refresh-bon-de-livraison.component";
import { RefreshSuiviDePaiementComponent } from "./suivide-paiement/refresh-suivi-de-paiement/refresh-suivi-de-paiement.component";
import { CritereEvaluationComponent } from "./evaluation-client/critere-evaluation/critere-evaluation.component";
import { DashbordVenteComponent } from "./dashbord-vente/dashbord-vente.component";
import { AuthorisationStatistique } from "../../authorisation/authorisationStatistique";
import { RouteGuardServiceService } from "../../authentification/route-guard-service.service";
import { ReclamationComponent } from "./facture/reclamation/reclamation.component";
import { RefreshCommandeComponent } from "./commande/refresh-commande/refresh-commande.component";
import { CommandeComponent } from "./commande/commande.component";



const routes: Routes = [{
    path: '',
    component: VenteComponent,
    children: [
        {
            path: 'commande',
            component: CommandeComponent,
        },
        {
            path: 'refreshCommande',
            component: RefreshCommandeComponent,
        },
        {
            path: 'contratClient',
            component: ContratClientComponent,
        },
        {
            path: 'contratMayssa',
            component: ContratComponent,
        },
        {
            path: 'refreshContratClient',
            component: RefreshContratClientComponent,
        },
        {
            path: 'demandePrixClient',
            component: DemandePrixClientComponent,
        },
        {
            path: 'refreshDemandePrixClient',
            component: RefreshDemandePrixClientComponent,
        },
        {
            path: 'demandeProduction',
            component: DemandeProductionComponent,
        },
        {
            path: 'devisClient',
            component: DevisClientComponent,
        },
        {
            path: 'refreshDevisClient',
            component: RefreshDevisClientComponent,
        },
        {
            path: 'clientEvaluation',
            component: ClientEvaluationComponent
        },
        {
            path: 'clientOrder',
            component: ClientOrderComponent,
        },
        {
            path: 'evaluationPourcentageClient',
            component: EvaluationPercentageClientComponent,
        },
        {
            path: 'facture',
            component: FactureComponent,
        },
        {
            path: 'reclamation',
            component: ReclamationComponent,
        },
        {
            path: 'factureAvoir',
            component: FactureAvoirComponent,
        },
        {
            path: 'bonLivraison',
            component: BonDeLivraisonComponent,
        },
        {
            path: 'suiviPaiement/:id',
            component: SuividePaiementComponent,
        },
        {
            path: 'refreshSuiviPaiement',
            component: RefreshSuiviDePaiementComponent,
        },

        {
            path: 'refreshFacture',
            component: RefreshFactureComponent,
        },

        {
            path: 'refreshBonLivraison',
            component: RefreshBonDeLivraisonComponent,
        },
        {
            path: '/select',
            component: SelectComponent,
        },
        {
            path: 'tarifsDeVente',
            component: TarifsDeVenteComponent,
        },
        {
            path: 'refreshTarifsDeVente',
            component: RefreshTarifsDeVenteComponent,
        },


        {
            path: 'quantityProduct',
            component: QuantityProductComponent,
        },
        {
            path: 'critere',
            component: CritereEvaluationComponent,
        },
        {

            path: 'statistique',
            component: DashbordVenteComponent,
            data: {
                authoritie: AuthorisationStatistique.STATISTIQUE
            },
            canActivate: [RouteGuardServiceService],
        },

    ]
}]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VenteRoutingModule {
}