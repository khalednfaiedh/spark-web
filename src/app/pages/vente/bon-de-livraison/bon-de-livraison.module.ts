import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalBonDeLivraisonComponent } from './modal-bon-de-livraison/modal-bon-de-livraison.component';
import { BonDeLivraisonComponent } from './bon-de-livraison.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule, NbAlertModule, NbSelectModule, NbDatepickerModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { RefreshBonDeLivraisonComponent } from './refresh-bon-de-livraison/refresh-bon-de-livraison.component';
import { ShowBonDeLivraisonComponent } from './show-bon-de-livraison/show-bon-de-livraison.component';
import { ShowNumeriqueBonDeLivraisonComponent } from './show-numerique-bon-de-livraison/show-numerique-bon-de-livraison.component';
import { UpdateBonDeLivraisonComponent } from './update-bon-de-livraison/update-bon-de-livraison.component';

@NgModule({
  declarations: [ModalBonDeLivraisonComponent, BonDeLivraisonComponent, RefreshBonDeLivraisonComponent, ShowBonDeLivraisonComponent, ShowNumeriqueBonDeLivraisonComponent, UpdateBonDeLivraisonComponent],
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
  entryComponents: [
    ModalBonDeLivraisonComponent,
    UpdateBonDeLivraisonComponent,
    ShowBonDeLivraisonComponent,
    ShowNumeriqueBonDeLivraisonComponent
  ]
})
export class BonDeLivraisonModule { }
