import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuividePaiementComponent } from './suivide-paiement.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule, NbAlertModule, NbSelectModule, NbDatepickerModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { ModalSuiviDePaiementComponent } from './modal-suivi-de-paiement/modal-suivi-de-paiement.component';
import { ShowSuiviDePaiementComponent } from './show-suivi-de-paiement/show-suivi-de-paiement.component';
import { RefreshSuiviDePaiementComponent } from './refresh-suivi-de-paiement/refresh-suivi-de-paiement.component';
import { BonsDePaiementComponent } from './bons-de-paiement/bons-de-paiement.component';

@NgModule({
  declarations: [SuividePaiementComponent, ModalSuiviDePaiementComponent, ShowSuiviDePaiementComponent, RefreshSuiviDePaiementComponent, BonsDePaiementComponent],
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
  entryComponents: [ModalSuiviDePaiementComponent, ShowSuiviDePaiementComponent, RefreshSuiviDePaiementComponent, BonsDePaiementComponent]

})
export class SuividePaiementModule { }
