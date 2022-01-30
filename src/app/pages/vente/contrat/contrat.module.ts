import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratComponent } from './contrat.component';
import { ModalContratComponent } from './modal-contrat/modal-contrat.component';
import { ShowContratComponent } from './show-contrat/show-contrat.component';
import { ReconduitComponent } from './reconduit/reconduit.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule, NbAlertModule, NbSelectModule, NbDatepickerModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContratComponent, ModalContratComponent, ShowContratComponent, ReconduitComponent],
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
  ],
  entryComponents: [ModalContratComponent, ShowContratComponent, ReconduitComponent]
})
export class ContratModule { }
