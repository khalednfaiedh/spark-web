import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SparkComptabiliteRoutingModule } from './spark-comptabilite-routing.module';
import { SparkComptabiliteComponent } from './spark-comptabilite.component';
import { EntrepriseComponent, ButtonViewComponent } from './entreprise/entreprise.component';
import { ModalEntrepriseComponent } from './entreprise/modal-entreprise/modal-entreprise.component';
import { ShowEntrepriseComponent } from './entreprise/show-entreprise/show-entreprise.component';
import { ThemeModule } from '../../@theme/theme.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ParametreModule } from './parametre/parametre.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
//import { TextMaskModule } from 'angular2-text-mask';
import { TranslateModule } from '@ngx-translate/core';
//import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PlanGeneralComponent, ButtonConsulter01Component } from './plan-general/plan-general.component';
import { ModalPlanGeneralComponent } from './plan-general/modal-plan-general/modal-plan-general.component';
import { ShowPlanGeneralComponent } from './plan-general/show-plan-general/show-plan-general.component';
import { PlanTiersComponent, ButtonConsulter02Component } from './plan-tiers/plan-tiers.component';
import { ModalPlanTiersComponent } from './plan-tiers/modal-plan-tiers/modal-plan-tiers.component';
import { ShowPlanTiersComponent } from './plan-tiers/show-plan-tiers/show-plan-tiers.component';
import { ExcerciceComponent } from './excercice/excercice.component';
import { ModalExcerciceComponent } from './excercice/modal-excercice/modal-excercice.component';
import { ShowExcerciceComponent } from './excercice/show-excercice/show-excercice.component';
import { ExcerciceOuvertsComponent, ButtonView01Component, ButtonViewReportANVComponent } from './excercice/excercice-ouverts/excercice-ouverts.component';
import { ExcerciceCloturesComponent } from './excercice/excercice-clotures/excercice-clotures.component';
import { JournalComponent, ButtonView02Component } from './journal/journal.component';
import { ModalJournalComponent } from './journal/modal-journal/modal-journal.component';
import { ShowJournalComponent } from './journal/show-journal/show-journal.component';
import { TitreComponent } from './excercice/titre/titre.component';
import { TitreExerciceComponent } from './journal/titre-exercice/titre-exercice.component';
import { JournalFilsComponent, ButtonView03Component } from './journal/journal-fils/journal-fils.component';
import { EcritureComponent, ButtonView04Component } from './ecriture/ecriture.component';
import { ModalEcritureComponent } from './ecriture/modal-ecriture/modal-ecriture.component';
import { ShowEcritureComponent } from './ecriture/show-ecriture/show-ecriture.component';
import { ImportExportComponent } from './import-export/import-export.component';
import { TitreJournalComponent } from './journal/titre-journal/titre-journal.component';
import { UpdateEcritureComponent } from './ecriture/update-ecriture/update-ecriture.component';
import { GrandLivreComponent } from './grand-livre/grand-livre.component';
import { BlanceGeneralComponent } from './blance-general/blance-general.component';
import { OpenPopUpComponent } from './grand-livre/open-pop-up/open-pop-up.component';
import { FilterGrandLIvreComponent } from './grand-livre/filter-grand-livre/filter-grand-livre.component';
import { ChoisirClasseComponent } from './excercice/choisir-classe/choisir-classe.component';
import { BalancTiersComponent } from './balanc-tiers/balanc-tiers.component';
import { GrandLivreTiersComponent } from './grand-livre-tiers/grand-livre-tiers.component';
import { ChoisirExerciceComponent } from './plan-general/choisir-exercice/choisir-exercice.component';
 
import { ChoisireExercicePlanTierComponent } from './plan-tiers/choisire-exercice-plan-tier/choisire-exercice-plan-tier.component';
import { MouvementCompteTiersComponent } from './plan-tiers/mouvement-compte-tiers/mouvement-compte-tiers.component';
import { EquilibrEcritureComponent } from './excercice/equilibr-ecriture/equilibr-ecriture.component';
import { NavigateComponent } from './excercice/navigate/navigate.component';
import { LivreJournalGeneralComponent } from './journal/livre-journal-general/livre-journal-general.component';
import { JournalCentraliseComponent } from './journal/journal-centralise/journal-centralise.component';
import { LettrageComponent } from './lettrage/lettrage.component';
import { LettrageTiersComponent } from './lettrage/lettrage-tiers/lettrage-tiers.component';
import { EtatFinancierComponent } from './etat-financier/etat-financier.component';
import { ShowEtatfinancierComponent } from './etat-financier/show-etatfinancier/show-etatfinancier.component';
import { ModalEtatfinancierComponent } from './etat-financier/modal-etatfinancier/modal-etatfinancier.component';
import { GenerateBilanCteResultatComponent } from './etat-financier/generate-bilan-cte-resultat/generate-bilan-cte-resultat.component';
import { RepportComponent } from './repport/repport.component';
import { RepportManuelleComponent } from './repport/repport-manuelle/repport-manuelle.component';
// import { transformeNumberPipe } from './pipe/number-decimal.pipe';
import { OuvrirJournalComponent } from './ecriture/ouvrir-journal/ouvrir-journal.component';
import { EcritureByLotComponent } from './ecriture/ecriture-by-lot/ecriture-by-lot.component';
import { OpenWindowComponent } from './ecriture/open-window/open-window.component';
import { RatioComponent } from './ratio/ratio.component';
import { RatioRentabiliteComponent } from './ratio/ratio-rentabilite/ratio-rentabilite.component';
import { NameComptePipe } from './pipe/name-compte.pipe';
import { DeclartionTVAComponent } from './declartion-tva/declartion-tva.component';
import { ParametrageTvaComponent } from './declartion-tva/parametrage-tva/parametrage-tva.component';
import { ModalParametreTvaComponent } from './declartion-tva/parametrage-tva/modal-parametre-tva/modal-parametre-tva.component';
import { PopUpComponent } from './declartion-tva/pop-up/pop-up.component';
import { RapprochementBancaireMAComponent } from './rapprochement-bancaire-ma/rapprochement-bancaire-ma.component';
import { ModalRapprochementComponent } from './rapprochement-bancaire-ma/modal-rapprochement/modal-rapprochement.component';
import { ContinuerapprochementComponent } from './rapprochement-bancaire-ma/continuerapprochement/continuerapprochement.component';
import { ModeleEcritureComponent } from './modele-ecriture/modele-ecriture.component';
import { ListModeleEcritureComponent } from './modele-ecriture/list-modele-ecriture/list-modele-ecriture.component';
import { OuvrirModelComponent } from './modele-ecriture/ouvrir-model/ouvrir-model.component';
import { RatioEquilibreFinancierComponent } from './ratio/ratio-equilibre-financier/ratio-equilibre-financier.component';
import { ActifComponent } from './etat-financier/actif/actif.component';
import { PassifComponent } from './etat-financier/passif/passif.component';
import { BalanceImportComponent } from './balance-import/balance-import.component';
import { ImportExportService } from './import-export/import-export.service';
import { MouvementComponent } from './plan-general/mouvement/mouvement.component';
import { ChoisirJournalComponent } from './journal/choisir-journal/choisir-journal.component';
import { TitleComponent } from './modele-ecriture/title/title.component';
import { TransformNumberPipe } from './pipe/transform-number.pipe';
//export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
const COMPTA_COMPONENTS = [

  EntrepriseComponent,
  ModalEntrepriseComponent,
  ShowEntrepriseComponent,

];
@NgModule({

  imports: [
    CommonModule,
    SparkComptabiliteRoutingModule,
    CommonModule,

    // PagesRoutingModule,
    ThemeModule,
    ECommerceModule,
    MiscellaneousModule,
    ParametreModule,
    NgSelectModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    // TextMaskModule,
    TranslateModule,
    // NgxMaskModule.forRoot(options)
  ],
  declarations: [
    SparkComptabiliteComponent,
    ...COMPTA_COMPONENTS,
    EntrepriseComponent,
    ModalEntrepriseComponent,
    ShowEntrepriseComponent,
    PlanGeneralComponent,
    ModalPlanGeneralComponent,
    ShowPlanGeneralComponent,
    PlanTiersComponent,
    ModalPlanTiersComponent,
    ShowPlanTiersComponent,
    ExcerciceComponent,
    ModalExcerciceComponent,
    ShowExcerciceComponent,
    ExcerciceOuvertsComponent,
    ExcerciceCloturesComponent,
    ButtonViewComponent,
    JournalComponent,
    ModalJournalComponent,
    ShowJournalComponent,
    ButtonView01Component,
    TitreComponent,
    TitreExerciceComponent,
    ButtonView02Component,
    JournalFilsComponent,
    EcritureComponent,
    ModalEcritureComponent,
    ShowEcritureComponent,
    ButtonView03Component,
    ButtonView04Component,
    ImportExportComponent,
    TitreJournalComponent,
    UpdateEcritureComponent,
    GrandLivreComponent,
    BlanceGeneralComponent,
    OpenPopUpComponent,
    FilterGrandLIvreComponent,
    ChoisirClasseComponent,
    ButtonViewReportANVComponent,
    BalancTiersComponent,
    GrandLivreTiersComponent,
    ChoisirExerciceComponent,
    MouvementComponent,
    ButtonConsulter01Component,
    ButtonConsulter02Component,
    ChoisireExercicePlanTierComponent,
    MouvementCompteTiersComponent,
    EquilibrEcritureComponent,
    NavigateComponent,
    LivreJournalGeneralComponent,
    JournalCentraliseComponent,
    LettrageComponent,
    LettrageTiersComponent,
    EtatFinancierComponent,
    ShowEtatfinancierComponent,
    ModalEtatfinancierComponent,
    GenerateBilanCteResultatComponent,
    RepportComponent,
    RepportManuelleComponent,
    
    // transformeNumberPipe,
    OuvrirJournalComponent,
    EcritureByLotComponent,
    OpenWindowComponent,
    RatioComponent,
    RatioRentabiliteComponent,
    NameComptePipe,
    DeclartionTVAComponent,
    ParametrageTvaComponent,
    ModalParametreTvaComponent,
    PopUpComponent,
    RapprochementBancaireMAComponent,
    ModalRapprochementComponent,
    ContinuerapprochementComponent,
    ModeleEcritureComponent,
    ListModeleEcritureComponent,
    OuvrirModelComponent,
    RatioRentabiliteComponent,
    RatioEquilibreFinancierComponent,
    ActifComponent,
    PassifComponent,
    BalanceImportComponent,
    ChoisirJournalComponent,
    TitleComponent,

  ],
  exports: [
    ...COMPTA_COMPONENTS,
    TranslateModule,
  ],

  entryComponents: [
    ModalEntrepriseComponent,
    ShowEntrepriseComponent,
    ModalPlanGeneralComponent,
    ShowPlanGeneralComponent,
    ModalPlanTiersComponent,
    ShowPlanTiersComponent,
    ModalExcerciceComponent,
    ButtonViewComponent,
    ShowExcerciceComponent,
    ModalJournalComponent,
    ShowJournalComponent,
    ButtonView01Component,
    ButtonView02Component,
    ButtonView03Component,
    ButtonView04Component,
    UpdateEcritureComponent,
    OpenPopUpComponent,
    FilterGrandLIvreComponent,
    ButtonViewReportANVComponent,
    ShowEcritureComponent,
    ChoisirClasseComponent,
    ButtonConsulter01Component,
    ChoisirExerciceComponent,
    ChoisireExercicePlanTierComponent,
    ButtonConsulter02Component,
    EquilibrEcritureComponent,
    LivreJournalGeneralComponent,
    EtatFinancierComponent,
    ShowEtatfinancierComponent,
    ModalEtatfinancierComponent,
    GenerateBilanCteResultatComponent,
    RepportManuelleComponent,
    RatioComponent,
    RatioRentabiliteComponent,
    RatioEquilibreFinancierComponent,
    RepportManuelleComponent,
    OuvrirJournalComponent,
    ModalParametreTvaComponent,
    PopUpComponent,
    ModalRapprochementComponent,
    OuvrirModelComponent,
    BalanceImportComponent,
    ChoisirJournalComponent


  ],
  providers: [ImportExportService]
})
export class SparkComptabiliteModule { }
