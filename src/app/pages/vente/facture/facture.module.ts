import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowFactureComponent } from './show-facture/show-facture.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule, NbAlertModule, NbSelectModule, NbDatepickerModule } from '@nebular/theme';
import { ModalFactureComponent } from './modal-facture/modal-facture.component';
import { RefreshFactureComponent } from './refresh-facture/refresh-facture.component';
import { FormsModule } from "@angular/forms";
import { FactureComponent, ButtonSuiviPaiement, ButtonReclamation } from './facture.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FactureAvoirModule } from '../facture-avoir/facture-avoir.module';
import { ReclamationComponent, ButtonnFactureAvoire } from './reclamation/reclamation.component';
import { ModalReclamationComponent } from './modal-reclamation/modal-reclamation.component';
import { ClientModule } from '../../admin/client/client.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { ShowFactureNumeriqueComponent } from './show-facture-numerique/show-facture-numerique.component';




@NgModule({
  declarations: [
    FactureComponent,
    ShowFactureComponent,
    ModalFactureComponent,
    RefreshFactureComponent,
    ButtonSuiviPaiement,
    ButtonReclamation,
    ReclamationComponent,
    ModalReclamationComponent,
    ButtonnFactureAvoire,
    ShowFactureNumeriqueComponent

  ],


  imports: [
    CommonModule,
    ThemeModule,
    NgSelectModule,
    Ng2SmartTableModule,
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbAlertModule,
    NbSelectModule,
    FormsModule,
    NbDatepickerModule,
    FactureAvoirModule,
    NgxCurrencyModule,
    ClientModule



  ],

  entryComponents: [
    ShowFactureComponent,
    ModalFactureComponent,
    ButtonSuiviPaiement,
    ButtonReclamation,
    ModalReclamationComponent,
    ButtonnFactureAvoire,
    ShowFactureNumeriqueComponent

  ],
})
export class FactureModule { }

