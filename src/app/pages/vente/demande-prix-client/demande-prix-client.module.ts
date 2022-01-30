import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbWindowModule, NbDialogModule } from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ShowDemandePrixClientComponent } from './show-demande-prix-client/show-demande-prix-client.component';
import { RefreshDemandePrixClientComponent } from './refresh-demande-prix-client/refresh-demande-prix-client.component';
import { DemandePrixClientComponent } from './demande-prix-client.component';
import { ModalDevisClientComponent } from '../devis-client/modal-devis-client/modal-devis-client.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ShowNumeriqueDemandePrixClientComponent } from './show-numerique-demande-prix-client/show-numerique-demande-prix-client.component';
import { ModalDemandePrixClientComponent } from './modal-demande-prix-client/modal-demande-prix-client.component';
import { ClientModule } from '../../admin/client/client.module';


@NgModule({
  declarations: [
    DemandePrixClientComponent,
    ShowDemandePrixClientComponent,
    RefreshDemandePrixClientComponent,
    ShowNumeriqueDemandePrixClientComponent,

  ],
  entryComponents: [

    ShowDemandePrixClientComponent,
    ModalDevisClientComponent,
    ShowNumeriqueDemandePrixClientComponent,



  ],
  exports: [
    ShowNumeriqueDemandePrixClientComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ThemeModule,
    NgxEchartsModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),

  ]
})
export class DemandePrixClientModule { }
