import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaracteristiqueEmballageComponent } from './caracteristique-emballage.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';

@NgModule({
  declarations: [CaracteristiqueEmballageComponent],
  imports: [
    ThemeModule,
    NgSelectModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
  ],
  exports: [
    CaracteristiqueEmballageComponent
  ]

})
export class CaracteristiqueEmballageModule { }
