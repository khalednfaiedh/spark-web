import { NgModule } from '@angular/core';
import { ShowContratClientComponent } from './show-contrat-client/show-contrat-client.component';
import { ModalContratClientComponent } from './modal-contrat-client/modal-contrat-client.component';
import { RefreshContratClientComponent } from './refresh-contrat-client/refresh-contrat-client.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { ContratClientComponent } from './contrat-client.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommandeModule } from '../commande/commande.module';
import { QuantityProductModule } from '../quantity-product/quantity-product.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
  imports: [
    ThemeModule,
    NgSelectModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    CommandeModule,
    QuantityProductModule,
    NgxCurrencyModule
  ],
  declarations: [
    ShowContratClientComponent,
    RefreshContratClientComponent,
    ModalContratClientComponent,
    ContratClientComponent,
  ],
  entryComponents: [
    ShowContratClientComponent,
    ModalContratClientComponent,
  ],

  exports: [ModalContratClientComponent, ShowContratClientComponent],

})
export class ContratClientModule { }
