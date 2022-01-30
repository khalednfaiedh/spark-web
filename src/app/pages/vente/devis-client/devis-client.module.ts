import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevisClientComponent } from './devis-client.component';
import { ShowDevisClientComponent } from './show-devis-client/show-devis-client.component';
import { ModalDevisClientComponent } from './modal-devis-client/modal-devis-client.component';
import { RefreshDevisClientComponent } from './refresh-devis-client/refresh-devis-client.component';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../@theme/theme.module';

import { NgSelectModule } from '@ng-select/ng-select';
import { ShowNumeriqueDevisClientComponent } from './show-numerique-devis-client/show-numerique-devis-client.component';
import { ShowDemandePrixClientComponent } from '../demande-prix-client/show-demande-prix-client/show-demande-prix-client.component';
import { DemandePrixClientModule } from '../demande-prix-client/demande-prix-client.module';

import { ClientModule } from '../../admin/client/client.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
  declarations: [
    DevisClientComponent,
    ShowDevisClientComponent,
    ModalDevisClientComponent,
    RefreshDevisClientComponent,
    ShowNumeriqueDevisClientComponent,

  ],
  entryComponents: [
    ModalDevisClientComponent,
    ShowDevisClientComponent,
    ShowNumeriqueDevisClientComponent,

  ],

  imports: [
    NgxCurrencyModule,
    CommonModule,
    ThemeModule,
    NgSelectModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    DemandePrixClientModule,


  ],
  exports: [
    ShowNumeriqueDevisClientComponent,

  ]

})
export class DevisClientModule { }
