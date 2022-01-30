import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NbDialogModule, NbWindowModule} from '@nebular/theme';
import { DemandeProductionComponent } from './demande-production.component';
import { ShowDemandeProducionComponent } from './show-demande-producion/show-demande-producion.component';
import { ModalDemandeProducionComponent } from './modal-demande-prodection/modal-demande-prodection.component';
import { ThemeModule } from '../../../@theme/theme.module';

@NgModule({
  declarations: [
    DemandeProductionComponent,
    ModalDemandeProducionComponent,
  ShowDemandeProducionComponent,
  ],
  entryComponents: [
    ShowDemandeProducionComponent,
    ModalDemandeProducionComponent,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
  ]
})
export class DemandeProductionModule { }