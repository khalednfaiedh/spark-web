import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { ParametreComponent } from './parametre/parametre.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { PlanTiersComponent } from './plan-tiers/plan-tiers.component';
import { ExcerciceComponent } from './excercice/excercice.component';
import { PlanGeneralComponent } from './plan-general/plan-general.component';
import { JournalComponent } from './journal/journal.component';
import { JournalFilsComponent } from './journal/journal-fils/journal-fils.component';
import { EcritureComponent } from './ecriture/ecriture.component';
import { ModalEcritureComponent } from './ecriture/modal-ecriture/modal-ecriture.component';
import { BlanceGeneralComponent } from './blance-general/blance-general.component';
import { BalancTiersComponent } from './balanc-tiers/balanc-tiers.component';
import { ImportExportComponent } from './import-export/import-export.component';
 
import { MouvementCompteTiersComponent } from './plan-tiers/mouvement-compte-tiers/mouvement-compte-tiers.component';
import { GrandLivreComponent } from './grand-livre/grand-livre.component';
import { LettrageComponent } from './lettrage/lettrage.component';
import { LettrageTiersComponent } from './lettrage/lettrage-tiers/lettrage-tiers.component';
import { LivreJournalGeneralComponent } from './journal/livre-journal-general/livre-journal-general.component';
import { EquilibrEcritureComponent } from './excercice/equilibr-ecriture/equilibr-ecriture.component';
import { NavigateComponent } from './excercice/navigate/navigate.component';
import { GrandLivreTiersComponent } from './grand-livre-tiers/grand-livre-tiers.component';
import { EtatFinancierComponent } from './etat-financier/etat-financier.component';
import { JournalCentraliseComponent } from './journal/journal-centralise/journal-centralise.component';
import { OpenWindowComponent } from './ecriture/open-window/open-window.component';
import { EcritureByLotComponent } from './ecriture/ecriture-by-lot/ecriture-by-lot.component';
import { RatioComponent } from './ratio/ratio.component';
import { RatioRentabiliteComponent } from './ratio/ratio-rentabilite/ratio-rentabilite.component';
import { RatioEquilibreFinancierComponent } from './ratio/ratio-equilibre-financier/ratio-equilibre-financier.component';
import { DeclartionTVAComponent } from './declartion-tva/declartion-tva.component';
import { ParametrageTvaComponent } from './declartion-tva/parametrage-tva/parametrage-tva.component';
import { RapprochementBancaireMAComponent } from './rapprochement-bancaire-ma/rapprochement-bancaire-ma.component';
import { ContinuerapprochementComponent } from './rapprochement-bancaire-ma/continuerapprochement/continuerapprochement.component';
import { ModeleEcritureComponent } from './modele-ecriture/modele-ecriture.component';
import { ListModeleEcritureComponent } from './modele-ecriture/list-modele-ecriture/list-modele-ecriture.component';
import { OuvrirModelComponent } from './modele-ecriture/ouvrir-model/ouvrir-model.component';
import { ActifComponent } from './etat-financier/actif/actif.component';
import { PassifComponent } from './etat-financier/passif/passif.component';
import { RepportComponent } from './repport/repport.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { SparkComptabiliteComponent } from './spark-comptabilite.component';
import { AuthorisationStatistique } from '../../authorisation/authorisationStatistique';
import { RouteGuardServiceService } from '../../authentification/route-guard-service.service';
import { AuthorisationCompta } from '../../authorisation/authorisationCompta';
import { MouvementComponent } from './plan-general/mouvement/mouvement.component';

 
const routes: Routes = [{
  path: '',
  component: SparkComptabiliteComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
    {
      path: 'parametre',
      component: ParametreComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
    {
      path: 'entreprise',
      component: EntrepriseComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
    {
      path: 'planTiers',
      component: PlanTiersComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    }, 
    {
      path: 'exercice',
      component: ExcerciceComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
     {
      path: 'planGeneral',
      component: PlanGeneralComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
     {
      path: 'journal',
      component: JournalComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    }, 
    {
      path: 'journalFils',
      component: JournalFilsComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
     {
      path: 'ecritures',
      component: EcritureComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    }
    , {

      path: 'ajoutEcritures',
      component: ModalEcritureComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
    {
      path: 'balanceGeneral',
      component: BlanceGeneralComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
     {
      path: 'balanceTiers',
      component: BalancTiersComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
    {
      path: 'import-export',
      component: ImportExportComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },

    {
      path: 'mouvement-general',
      component:  MouvementComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
    {
      path: 'mouvement-tiers',
      component: MouvementCompteTiersComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },

    {
      path: 'grandLivre',
      component: GrandLivreComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
    {
      path: 'lettrages',
      component: LettrageComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
    {
      path: 'lettragesTiers',
      component: LettrageTiersComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
    {
      path: 'livreJournal',
      component: LivreJournalGeneralComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
    {
      path: 'equilibreEcriture',
      component: EquilibrEcritureComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    }, 
    {
      path: 'navigateExercice',
      component: NavigateComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
    {
      path: 'grandLivreTiers',
      component: GrandLivreTiersComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
    {
      path: 'etatfinancier',
      component: EtatFinancierComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
    {
      path: 'journalCentralisee',
      component: JournalCentraliseComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },

    {
      path: 'ecritureOpenWindow',
      component: OpenWindowComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
    {
      path: 'ecritureOuvrireJournal',
      component: OpenWindowComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
    {
      path: 'ecritureByLot',
      component: EcritureByLotComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
    {
      path: 'ratio',
      component: RatioComponent,
      data:{
        authoritie:  AuthorisationCompta.AUTHORISATION
      } ,
      canActivate: [RouteGuardServiceService],
    },
    {
      path: 'ratioRentabilite',
      component: RatioRentabiliteComponent,
    },
    {
      path: 'ratioEquilibreFinancier',
      component: RatioEquilibreFinancierComponent,
    },
    {
      path: 'declartionTVA',
      component: DeclartionTVAComponent,
    },
    {
      path: 'parametreTVA',
      component: ParametrageTvaComponent,
    },
    {
      path: 'rapprochement',
      component: RapprochementBancaireMAComponent,
    },
    {
      path: 'continueRapprochement',
      component: ContinuerapprochementComponent,
    },

    {
      path: 'modeleEcriture',
      component: ModeleEcritureComponent,
    },
    {
      path: 'listModeleEcriture',
      component: ListModeleEcritureComponent,
    },
    {
      path: 'ouvrirModel',
      component: OuvrirModelComponent,
    },
    {
      path: 'actifs',
      component: ActifComponent,
    },

    {
      path: 'passifs',
      component: PassifComponent,
    },
    {
      path: 'repport',
      component: RepportComponent
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    }, {
      path: 'parametre',
      component: ParametreComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SparkComptabiliteRoutingModule { }
