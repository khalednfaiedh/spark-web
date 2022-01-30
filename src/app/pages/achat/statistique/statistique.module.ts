import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatistiqueComponent } from './statistique.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    StatistiqueComponent,
  ],
  imports: [
    CommonModule,
      ThemeModule,
      NgSelectModule,
      Ng2SmartTableModule,
      NbDialogModule.forChild(),
      NbWindowModule.forChild(),
      TranslateModule,
  ],
  exports:[
    TranslateModule,
  ],
})
export class StatistiqueModule { }
