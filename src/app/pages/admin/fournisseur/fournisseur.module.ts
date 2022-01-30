import {NgModule} from '@angular/core';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NbDialogModule, NbWindowModule} from '@nebular/theme';

import {ModalFournisseurComponent} from './modal-fournisseur/modal-fournisseur.component';
import {RefreshFournisseurComponent} from './refresh-fournisseur/refresh-fournisseur.component';
import {ShowFournisseurComponent} from './show-fournisseur/show-fournisseur.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContactComponent } from './contact/contact.component';
import { FournisseurComponent, ButtonViewComponent, ButtonViewAComponent, ButtonViewBComponent } from './fournisseur.component';
import { AdresseDeLivraisonComponent } from './adresse-de-livraison/adresse-de-livraison.component';
import { CordonneeBancaireComponent } from './cordonnee-bancaire/cordonnee-bancaire.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { EvaluationFournisseurModule } from '../../achat/evaluation-fournisseur/evaluation-fournisseur.module';
import { FournisseurEvaluationComponent } from '../../achat/evaluation-fournisseur/fournisseur-evaluation/fournisseur-evaluation.component';
import { FournisseurCompteBancaireComponent } from './compte-bancaire/compte-bancaire.component';
import { AddCompteFournisseurComponent } from './compte-bancaire/add-compte/add-compte.component';
import { ShowCompteFournisseurComponent } from './compte-bancaire/show-compte/show-compte.component';
@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NgSelectModule,
    NbWindowModule.forChild(),
    EvaluationFournisseurModule,
  ],
  declarations: [
    FournisseurComponent,
    ShowFournisseurComponent,
    RefreshFournisseurComponent,
    ModalFournisseurComponent,
    ContactComponent,
    ButtonViewComponent,
    ButtonViewAComponent,
    ButtonViewBComponent,
    AdresseDeLivraisonComponent,
    CordonneeBancaireComponent,
    FournisseurCompteBancaireComponent,
    AddCompteFournisseurComponent,
    ShowCompteFournisseurComponent,
    FournisseurEvaluationComponent,
  ],
  entryComponents: [
    ModalFournisseurComponent,
    ShowFournisseurComponent,
    ContactComponent,
    ButtonViewComponent,
    ButtonViewAComponent,
    ButtonViewBComponent,
    AdresseDeLivraisonComponent,
    CordonneeBancaireComponent,
    AddCompteFournisseurComponent,
    ShowCompteFournisseurComponent,
    FournisseurEvaluationComponent
  ],
})
export class FournisseurModule {
}
