import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConditionDePaiementComponent } from './modal-condition-de-paiement/modal-condition-de-paiement.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { ConditionDePaiementComponent } from './condition-de-paiement.component';
import { ShowConditionDePaiementComponent } from './show-condition-de-paiement/show-condition-de-paiement.component';

@NgModule({

  imports: [
    ThemeModule,
    NgSelectModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    TranslateModule,
  ],
  declarations: [ConditionDePaiementComponent,],

})
export class ConditionDePaiementModule { }
