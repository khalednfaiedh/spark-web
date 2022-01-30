import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NbDialogModule, NbWindowModule} from '@nebular/theme';
import {BonCommandeComponent, ButtonViewComponent, ButtonViewPayeComponent} from './bon-commande.component';
import {ShowBonCommandeComponent} from './show-bon-commande/show-bon-commande.component'
import {ModaleBonCommandeComponent} from './modale-bon-commande/modale-bon-commande.component';
import { RefreshBonCommandeComponent } from './refresh-bon-commande/refresh-bon-commande.component';
import { HistoriqueCommandeComponent } from './historique-commande/historique-commande.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UpdateBonCommandeComponent } from './update-bon-commande/update-bon-commande.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { EvaluationFournisseurModule } from '../evaluation-fournisseur/evaluation-fournisseur.module';
import { BilanModule } from '../bilan/bilan.module';
import { ModalBonCommandeComponent } from './modal-bon-commande/modal-bon-commande.component';
import { ModalEvaluationFournisseurComponent } from '../evaluation-fournisseur/modal-evaluation/modal-evaluation-fournisseur.component';

@NgModule({

  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NgSelectModule,
    EvaluationFournisseurModule,
    BilanModule,
  ],
  declarations: [
    BonCommandeComponent,
    ShowBonCommandeComponent,
    ModaleBonCommandeComponent,
    RefreshBonCommandeComponent,
    ButtonViewComponent,
    HistoriqueCommandeComponent,
    UpdateBonCommandeComponent,
    ButtonViewPayeComponent,
    ModalBonCommandeComponent,
  ],
  entryComponents: [
    ModaleBonCommandeComponent,
    ShowBonCommandeComponent,
    ButtonViewComponent,
    UpdateBonCommandeComponent,
    ButtonViewPayeComponent,
    ModalBonCommandeComponent,
  ],
})
export class BonCommandeModule { }
