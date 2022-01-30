import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeComponent } from './commande.component';
import { ModalCommandeComponent } from './modal-commande/modal-commande.component';
import { ShowCommandeComponent } from './show-commande/show-commande.component';
import { RefreshCommandeComponent } from './refresh-commande/refresh-commande.component';
import { ShowNumeriqueCommandeClientComponent } from './show-numerique-commande-client/show-numerique-commande-client.component';
import { ModalCommandeClientContratComponent } from './modal-commande-client-contrat/modal-commande-client-contrat.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { EvaluationClientModule } from '../evaluation-client/evaluation-client.module';
import { NgxCurrencyModule } from 'ngx-currency';

import { ClientModule } from '../../admin/client/client.module';
import { DevisClientComponent } from '../devis-client/devis-client.component';
import { DevisClientModule } from '../devis-client/devis-client.module';
import { ContratClientModule } from '../contrat-client/contrat-client.module';
import { ContratModel } from '../../rh/contrat/contrat.model';
import { ContratModule } from '../contrat/contrat.module';

@NgModule({
  declarations: [
    CommandeComponent,
    ModalCommandeComponent,
    ShowCommandeComponent,
    RefreshCommandeComponent,
    ShowNumeriqueCommandeClientComponent,
    ModalCommandeClientContratComponent,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    NgSelectModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    EvaluationClientModule,
    NbWindowModule.forChild(),
    NgxCurrencyModule,
    DevisClientModule,
    


  ],
  entryComponents: [
    ModalCommandeComponent,
    ShowCommandeComponent,
    ShowNumeriqueCommandeClientComponent,
    ModalCommandeClientContratComponent,

  ],

})
export class CommandeModule { }
