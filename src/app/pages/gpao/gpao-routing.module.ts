import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GPAOComponent } from './gpao.component';
import { IlotService } from './ilot/ilot.service';
import { IlotComponent } from './ilot/ilot.component';
import { LigneComponent } from './ligne/ligne.component';
import { SectionComponent } from './section/section.component';
import { NomenclatureComponent } from './nomenclature/nomenclature.component';
import { PosteChargeComponent } from './poste-charge/poste-charge.component';
import { ViewGraphComponent } from './nomenclature/view-graph/view-graph.component';
import { BonLivraisonProdComponent } from './bon-livraison-prod/bon-livraison-prod.component';
import { GammeOperatoireComponent } from './gamme-operatoire/gamme-operatoire.component';
import { PhaseComponent } from './phase/phase.component';
import { OperationComponent } from './operation/operation.component';
import { DemandeProduitComponent } from './demande-produit/demande-produit.component';
import { PdpComponent } from './pdp/pdp.component';

const routes: Routes = [{
  path: '',
  component: GPAOComponent,
  children: [
    {
      path: 'ilots/:id',
      component:   IlotComponent,
    },
    {
      path: 'lignes/:id',
      component:    LigneComponent,
    },
    {
      path: 'sections/:id',
      component:    SectionComponent,
    },
    {
      path: 'nomenclature',
      component:     NomenclatureComponent,
    },
    {
      path: 'posteCharge',
      component:      PosteChargeComponent,
    },
    {
      path: 'viewGraphe/:id',
      component:       ViewGraphComponent,

    },
    {
      path: 'bl-prod',
      component:  BonLivraisonProdComponent,
    },{
      path: 'gammesOperatoire',
      component:        GammeOperatoireComponent,

    },
    {
      path: 'phase',
      component:         PhaseComponent,

    },
    {
      path: 'operation',
      component:          OperationComponent,

    },
    {
      path: 'demande',
      component: DemandeProduitComponent,
    },
    {
      path: 'pdp',
      component:    PdpComponent       ,

    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GPAORoutingModule { }
