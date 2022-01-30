import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFactureAvoirComponent } from './modal-facture-avoir/modal-facture-avoir.component';
import { ShowFactureAvoirComponent } from './show-facture-avoir/show-facture-avoir.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { FactureAvoirComponent } from './facture-avoir.component';
import { NbDialogModule, NbAlertModule, NbWindowModule, NbDatepickerModule } from '@nebular/theme';


@NgModule({
  declarations: [FactureAvoirComponent, ModalFactureAvoirComponent, ShowFactureAvoirComponent],
  imports: [
    CommonModule,
    ThemeModule,
    NgSelectModule,
    Ng2SmartTableModule,
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbAlertModule,

    FormsModule,
    NbDatepickerModule,
  ],
  entryComponents: [ModalFactureAvoirComponent, ShowFactureAvoirComponent
  ]
})
export class FactureAvoirModule { }
