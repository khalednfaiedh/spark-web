import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { ShowContratFournisseurComponent } from './show-contrat-fournisseur/show-contrat-fournisseur.component';
import { RefreshContratFournisseurComponent } from './refresh-contrat-fournisseur/refresh-contrat-fournisseur.component';
import { ContratFournisseurComponent } from './contrat-fournisseur.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    Ng2SmartTableModule,
    NgSelectModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
  ],
  declarations: [
    ContratFournisseurComponent,
    ShowContratFournisseurComponent,
    RefreshContratFournisseurComponent
  ],
  entryComponents: [
    ShowContratFournisseurComponent
   
  ],
})
export class ContratFournisseurModule { }
