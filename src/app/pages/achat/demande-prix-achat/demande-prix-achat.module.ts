import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { DemandePrixAchatComponent } from "./demande-prix-achat.component";
import { ModalDemandePrixAchatComponent } from './modal-demande-prix/modal-demande-prix-achat.component';
import { ShowDemandePrixAchatComponent } from './show-demande-prix-achat/show-demande-prix-achat.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { DevisAchatModule } from '../devis-achat/devis-achat.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({

  imports: [
    CommonModule,
    ThemeModule,
    NgxEchartsModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    DevisAchatModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  declarations: [
    DemandePrixAchatComponent,
    ModalDemandePrixAchatComponent,
    ShowDemandePrixAchatComponent,
  ],
  entryComponents: [
    ModalDemandePrixAchatComponent,
    ShowDemandePrixAchatComponent,

  ],
  exports: [
    ShowDemandePrixAchatComponent
  ]
})
export class DemandePrixAchatModule { }
