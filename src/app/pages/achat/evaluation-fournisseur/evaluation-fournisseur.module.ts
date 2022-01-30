import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { ThemeModule } from '../../../@theme/theme.module';
import { EvaluationPercentageFournisseurComponent } from './evaluation-percentage-fournisseur/evaluation-percentage-fournisseur.component';
import { FournisseurEvaluationComponent } from './fournisseur-evaluation/fournisseur-evaluation.component';
import { ModalEvaluationFournisseurComponent } from './modal-evaluation/modal-evaluation-fournisseur.component';
import { FournisseurOrderComponent } from './fournisseur-order/fournisseur-order.component';

@NgModule({
  declarations: [
    EvaluationPercentageFournisseurComponent,
   // FournisseurEvaluationComponent,
    FournisseurOrderComponent,
    ModalEvaluationFournisseurComponent,
  ],
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
  ]
})
export class EvaluationFournisseurModule { }
