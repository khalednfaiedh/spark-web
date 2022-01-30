import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GPAORoutingModule } from './gpao-routing.module';
import { IlotComponent, ButtonLigne, ButtonSection } from './ilot/ilot.component';
import { ModalIlotComponent } from './ilot/modal-ilot/modal-ilot.component';
import { GPAOComponent } from './gpao.component';
import { ThemeModule } from '../../@theme/theme.module';
// import { ECommerceModule } from './e-commerce/e-commerce.module';
// import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
// import { ParametreModule } from './parametre/parametre.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { ECommerceModule } from '../crm/e-commerce/e-commerce.module';
import { MiscellaneousModule } from '../miscellaneous/miscellaneous.module';
import { ParametreModule } from '../parametre/parametre.module';
import { LigneComponent, ButtonPosteCharge01 } from './ligne/ligne.component';
import { SectionComponent, ButtonPosteCharge02  } from './section/section.component';
import { ModalLigneComponent } from './ligne/modal-ligne/modal-ligne.component';
import { ModalSectionComponent } from './section/modal-section/modal-section.component';
import { NomenclatureComponent, viewGraphe } from './nomenclature/nomenclature.component';
import { ModalNomenclatureComponent } from './nomenclature/modal-nomenclature/modal-nomenclature.component';
import { PosteChargeComponent, ButtonCoutRevient } from './poste-charge/poste-charge.component';
import { ModalPosteChargeComponent } from './poste-charge/modal-poste-charge/modal-poste-charge.component';
import { ViewGraphComponent } from './nomenclature/view-graph/view-graph.component';
import { AngularTreeGridModule } from 'angular-tree-grid';
import { BonLivraisonProdComponent } from './bon-livraison-prod/bon-livraison-prod.component';

import { CoutRevientComponent } from './poste-charge/cout-revient/cout-revient.component';
import { GammeOperatoireComponent, ButtonOperation } from './gamme-operatoire/gamme-operatoire.component';
import { ModalGammeOperatoireComponent } from './gamme-operatoire/modal-gamme-operatoire/modal-gamme-operatoire.component';
import { PhaseComponent, ButtonOperation02 } from './phase/phase.component';
import { ModalPhaseComponent } from './phase/modal-phase/modal-phase.component';
import { OperationComponent } from './operation/operation.component';
import { ModalOperationComponent } from './operation/modal-operation/modal-operation.component';
import { DemandeProduitComponent } from './demande-produit/demande-produit.component';
import { PdpComponent } from './pdp/pdp.component';
@NgModule({
  declarations:
  
  
  [
     IlotComponent, 
     ModalIlotComponent,
     GPAOComponent,
     LigneComponent,
     SectionComponent,
     ModalLigneComponent,
     ModalSectionComponent,
     ButtonLigne,
     ButtonSection,
     NomenclatureComponent,
     ModalNomenclatureComponent,
     PosteChargeComponent,
     ModalPosteChargeComponent,
     ButtonPosteCharge01,
     ButtonPosteCharge02,
     ViewGraphComponent,
     viewGraphe,
     BonLivraisonProdComponent,
     CoutRevientComponent,
     ButtonCoutRevient,
     GammeOperatoireComponent,
     ModalGammeOperatoireComponent,
     ButtonOperation,
     PhaseComponent,
     ModalPhaseComponent,
     ButtonOperation02,
     OperationComponent,
     ModalOperationComponent,
     DemandeProduitComponent,
     ModalOperationComponent,
     PdpComponent,
     OperationComponent
     
 
  ],
    entryComponents:[
      ModalIlotComponent,
      ButtonLigne,
      ButtonSection,
      ModalLigneComponent,
      ModalSectionComponent,
      NomenclatureComponent,
      ModalNomenclatureComponent,
      ButtonPosteCharge01,
      ButtonPosteCharge02,
      ModalPosteChargeComponent,
      ViewGraphComponent,
      viewGraphe,
      ButtonCoutRevient,
      CoutRevientComponent,
      ModalGammeOperatoireComponent,
      ButtonOperation02,
      ModalPhaseComponent,
      ButtonOperation,
      ModalOperationComponent
      
    ],

  imports: [
    CommonModule,
    GPAORoutingModule,
    ThemeModule,
    ECommerceModule,
    MiscellaneousModule,
    ParametreModule,
    NgSelectModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    AngularTreeGridModule
  ]


})
export class GPAOModule { }
