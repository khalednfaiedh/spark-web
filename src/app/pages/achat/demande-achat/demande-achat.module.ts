import { ModalContratFournisseurComponent } from '../contrat-fournisseur/modal-contrat-fournisseur/modal-contrat-fournisseur.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxEchartsModule} from 'ngx-echarts';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NbDialogModule, NbWindowModule} from '@nebular/theme';
import {DemandeAchatComponent} from './demande-achat.component';
import {ShowDemandeAchatComponent} from './show-demande-achat/show-demande-achat.component'
import {ModalDemandeAchatComponent} from './modal-demande-achat/modal-demande-achat.component';
import {ModalDemandePrixAchatComponent} from "../demande-prix-achat/modal-demande-prix/modal-demande-prix-achat.component";
import { ThemeModule } from '../../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfirmDemandeAchatComponent } from './confirm-demande-achat/confirm-demande-achat.component';
@NgModule({
  imports: [
    NgSelectModule,
    CommonModule,
    ThemeModule,
    NgxEchartsModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
  ],
  declarations: [
    DemandeAchatComponent,
    ShowDemandeAchatComponent,
    ModalDemandeAchatComponent,
    ModalContratFournisseurComponent,
    ConfirmDemandeAchatComponent,
  ],
  entryComponents: [
    ModalDemandeAchatComponent,
    ShowDemandeAchatComponent,
    ModalDemandePrixAchatComponent,
    ModalContratFournisseurComponent,
    ConfirmDemandeAchatComponent
  ],
})
export class DemandeAchatModule { }
