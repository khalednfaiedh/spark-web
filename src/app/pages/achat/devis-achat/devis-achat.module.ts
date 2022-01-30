import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NbAlertModule, NbDialogModule, NbWindowModule } from "@nebular/theme";
import { DevisAchatComponent } from "./devis-achat.component";
import { ThemeModule } from '../../../@theme/theme.module';
import { ModalDevisAchatComponent } from './modal-devis-achat/modal-devis-achat.component';
import { RefreshDevisAchatComponent } from './refresh-devis-achat/refresh-devis-achat.component';
import { ShowDevisAchatComponent } from './show-devis-achat/show-devis-achat.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ShowDemandePrixAchatComponent } from '../demande-prix-achat/show-demande-prix-achat/show-demande-prix-achat.component';
import { DemandePrixAchatModel } from '../demande-prix-achat/model/demande-prix-achat.model';
import { DemandePrixAchatModule } from '../demande-prix-achat/demande-prix-achat.module';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NbAlertModule,
    NgSelectModule,


  ],
  declarations: [
    DevisAchatComponent,
    RefreshDevisAchatComponent,
    ShowDevisAchatComponent,
    ModalDevisAchatComponent,

  ],
  entryComponents: [
    ShowDevisAchatComponent,
    ModalDevisAchatComponent,
    ShowDemandePrixAchatComponent
  ],

})

export class DevisAchatModule { }
